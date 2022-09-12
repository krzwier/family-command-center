import { useState, useEffect } from "react";

export const usePerson = (personId) => {
   const [person, setPerson] = useState({ personName: "" });

   useEffect(() => {
      fetch(
         `http://localhost:4001/persons/person/${personId}/`
      )
         .then((response) => response.json())
         .then(setPerson);
   }, [personId]);

   return person;
};
