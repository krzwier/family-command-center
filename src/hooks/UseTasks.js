import { useState, useEffect, useCallback } from "react";
import { saveRoutineCompletion } from "../services/RoutineCompletion.js";

export const useTasks = (routineId, incrementPointBalance, decrementPointBalance) => {
   const [tasks, setTasks] = useState([]);
   const [listIsComplete, setListIsComplete] = useState(false);

   useEffect(() => {
      fetch(`http://localhost:4001/tasks/routineId=${routineId}`)
         .then((response) => response.json())
         .then((data) => {
            const incomingTasks = data.tasks;
            setTasks(
               incomingTasks.map((task) => ({
                  ...task,
                  completed: false
               }))
            );
         });
   }, [routineId]);

   const toggleTaskCompletion = useCallback(
      (taskId) => {
         const updatedTasks = tasks.map((task) => ({
            ...task,
            completed: task.TaskId === taskId ? !task.completed : task.completed
         }));
         const routineComplete = updatedTasks.filter((task) => !task.completed).length === 0;
         saveRoutineCompletion(routineId, routineComplete);
         if (routineComplete && !listIsComplete) {
            incrementPointBalance();
         }
         if (!routineComplete && listIsComplete) {
            decrementPointBalance();
         }
         setTasks(updatedTasks);
         setListIsComplete(routineComplete);
      },
      [tasks, setTasks, listIsComplete, setListIsComplete]
   );

   return { tasks, toggleTaskCompletion, listIsComplete };
};
