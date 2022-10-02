import { useState, useEffect } from "react";

export const useRoutines = (personId, hour) => {
   const [routines, setRoutines] = useState([]);

   useEffect(() => {
      fetch(
         `http://localhost:4001/routines/person=${personId},hour=${hour}`
      )
         .then((response) => response.json())
         .then((data) => setRoutines(data.routines));
   }, [personId, hour]);

   return routines;
};
