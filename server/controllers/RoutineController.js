import express from "express";
import { db } from "../../database/db-config.js";

export const routinesRouter = express.Router();

const routinesForPersonController = async (req, res) => {
   const { personId, hour } = req.params;
   try {
      const routines = await db
         .select("*")
         .from("routine")
         .join("personRoutine", "routine.RoutineId", "personRoutine.RoutineId")
         .where("personRoutine.PersonId", personId)
         .where("routine.StartHour", "<=", hour)
         .where("routine.EndHour", ">", hour);
      return res.status(200).json({ routines });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         error: `Error retrieving routines for person with id '${personId}' at hour '${hour}': ${error.stack}`
      });
   }
};

const completeRoutineController = async (req, res) => {
   const { routineId, isComplete } = req.params;
   const status = isComplete === "true";
   try {
      const returnMessage = await db("routine")
         .where("RoutineId", routineId)
         .update("Completed", status);
      res.status(200).send(
         `Status of routine ${routineId} has been saved as ${
            status ? "completed" : "incomplete"
         }. Message: ${returnMessage}`
      );
   } catch (error) {
      console.log(error);
      res.status(500).json({
         error: `Error saving completion status of routine '${routineId}': ${error.stack}`
      });
   }
};

routinesRouter.get("/person=:personId,hour=:hour", routinesForPersonController);

routinesRouter.post(
   "/saveCompletion/routineId=:routineId,isComplete=:isComplete",
   completeRoutineController
);
