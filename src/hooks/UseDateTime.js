import { useState, useEffect } from "react";

export const useDateTime = () => {
   const [date, setDate] = useState(new Date());
   const [hour, setHour] = useState(0);
   const [day, setDay] = useState(0);

   useEffect(() => {
      const timer = setInterval(() => {
         const currentDate = new Date();
         const currentHour = currentDate.getHours();
         const currentDay = currentDate.getDay();
         if (currentDate !== date) {
            setDate(currentDate);
         }
         if (currentHour !== hour) {
            setHour(currentHour);
         }
         if (currentDay !== day) {
            setDay(currentDay);
         }
      }, 1000);

      return () => {
         clearInterval(timer);
      };
   });

   return { date, hour, isSchoolDay: day !== 0 && day !== 6 };
};
