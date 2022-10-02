import express from "express";
import { db } from "../../database/db-config.js";

export const personsRouter = express.Router();

export const personController = async (req, res) => {
   try {
      const persons = await db("person");
      return res.status(200).json({ persons });
   } catch (error) {
      res.status(500).json({
         error: `Error retrieving persons: ${error.stack}`
      });
   }
};

export const singlePersonController = async (req, res) => {
   const { personId } = req.params;
   try {
      const person = await db.select("*").from("person").where("PersonId", personId);
      return res.status(200).json(person[0]);
   } catch (error) {
      res.status(500).json({
         error: `Error retrieving person with id '${personId}': ${error.stack}`
      });
   }
};

personsRouter.get("/", personController);
personsRouter.get("/person/:personId", singlePersonController);
