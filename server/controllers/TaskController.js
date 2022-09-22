import express from "express";
import { db } from "../../database/db-config.js";

export const tasksRouter = express.Router();

const taskController = async (req, res) => {
   try {
      const tasks = await db("task");
      return res.status(200).json(tasks);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         error: `Error retrieving tasks: ${error.stack}`
      });
   }
};

tasksRouter.get("/", taskController);
