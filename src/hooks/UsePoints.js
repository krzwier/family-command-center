import { useState, useEffect, useCallback } from "react";

export const usePoints = (personId) => {
   const [pointBalance, setPointBalance] = useState(0);

   useEffect(() => {
      fetch(`http://localhost:4001/pointBalance/personId=${personId}`)
         .then((response) => response.json())
         .then(setPointBalance);
   }, [personId]);

   const incrementPointBalance = useCallback(() => {
      setPointBalance(pointBalance + 1);
      fetch(`http://localhost:4001/pointBalance/increment/personId=${personId}`, {
         method: "POST"
      });
   }, [personId, pointBalance, setPointBalance]);

   const decrementPointBalance = useCallback(() => {
      setPointBalance(pointBalance - 1);
      fetch(`http://localhost:4001/pointBalance/decrement/personId=${personId}`, {
         method: "POST"
      });
   }, [personId, pointBalance, setPointBalance]);

   return { pointBalance, incrementPointBalance, decrementPointBalance };
};
