import { useState, useEffect, useCallback } from "react";

export const useRoutines = (personId, hour, isSchoolDay) => {
   const [routines, setRoutines] = useState([]);

   useEffect(() => {
      fetch(
         `http://localhost:4001/routines/person=${personId},hour=${hour},isSchoolDay=${
            isSchoolDay ? 1 : 0
         }`
      )
         .then((response) => response.json())
         .then((data) => setRoutines(data.routines));
   }, [personId, hour]);

   return routines;
};
