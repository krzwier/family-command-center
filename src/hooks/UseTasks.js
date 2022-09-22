import { useState, useEffect } from "react";

export const useTasks = () => {
   const [tasks, setTasks] = useState([]);

   useEffect(() => {
      fetch("http://localhost:4001/tasks/")
         .then((response) => response.json())
         .then((data) => setPersons(data));
   }, []);

   return tasks;
};
