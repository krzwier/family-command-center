import express from "express";
import { db } from "../../database/db-config.js";

export const pointRouter = express.Router();

const pointController = async (req, res) => {
   const { personId } = req.params;
   try {
      const result = await db.select("Balance").from("pointBank").where("PersonId", personId);
      return result.length === 0
         ? res.status(200).json("no account")
         : res.status(200).json(result[0].Balance);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         error: `Error retrieving balance for personId '${personId}': ${error.stack}`
      });
   }
};

const incrementPointsController = async (req, res) => {
   const { personId } = req.params;
   try {
      await db.raw("update pointBank set Balance = Balance + 1 where personId = ?", personId);
      res.status(200).send(`Point balance for person ${personId} has been incremented.`);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         error: `Error updating point balance for person '${personId}': ${error.stack}`
      });
   }
};

const decrementPointsController = async (req, res) => {
   const { personId } = req.params;
   try {
      await db.raw("update pointBank set Balance = Balance - 1 where personId = ?", personId);
      res.status(200).send(`Point balance for person ${personId} has been decremented.`);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         error: `Error updating point balance for person '${personId}': ${error.stack}`
      });
   }
};

pointRouter.get("/personId=:personId", pointController);
pointRouter.post("/increment/personId=:personId", incrementPointsController);
pointRouter.post("/decrement/personId=:personId", decrementPointsController);
