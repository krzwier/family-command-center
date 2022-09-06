import express from "express";
import { db } from "../../database/db-config.js";

export const personsRouter = express.Router();

export const personController = async (req, res) => {
   try {
      const persons = await db("person");
      return res.status(200).json({ persons });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         error: `Error retrieving persons: ${error.stack}`
      });
   }
};

personsRouter.get("/", personController);
