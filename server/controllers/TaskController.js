import express from "express";
import { db } from "../../database/db-config.js";

export const tasksRouter = express.Router();

const taskController = async (req, res) => {
   const { routineId } = req.params;
   try {
      const tasks = await db
         .select("*")
         .from("task")
         .join(
            "routineTask",
            "task.TaskId",
            "routineTask.TaskId"
         )
         .where("routineTask.RoutineId", routineId);
      return res.status(200).json({ tasks });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         error: `Error retrieving tasks for routineId '${routineId}': ${error.stack}`
      });
   }
};

tasksRouter.get("/routineId=:routineId", taskController);
