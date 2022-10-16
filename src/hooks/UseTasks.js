import { useState, useEffect, useCallback } from "react";

export const useTasks = (
   routineId,
   incrementPointBalance,
   decrementPointBalance,
   routineIsComplete
) => {
   const [tasks, setTasks] = useState([]);
   const [listIsComplete, setListIsComplete] = useState(routineIsComplete);

   useEffect(() => {
      fetch(`http://localhost:4001/tasks/routineId=${routineId}`)
         .then((response) => response.json())
         .then((data) => {
            const incomingTasks = data.tasks;
            setTasks(
               incomingTasks.map((task) => ({
                  ...task,
                  completed: routineIsComplete
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
         saveRoutineCompletion(routineComplete);
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

   const saveRoutineCompletion = useCallback(
      (isCompleted) => {
         fetch(
            `http://localhost:4001/routines/saveCompletion/routineId=${routineId},isComplete=${
               isCompleted ? 1 : 0
            }`,
            {
               method: "GET"
            }
         );
      },
      [routineId]
   );

   return { tasks, toggleTaskCompletion, listIsComplete };
};
