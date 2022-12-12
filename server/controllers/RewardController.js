import express from "express";
import { db } from "../../database/db-config.js";

export const rewardRouter = express.Router();

export const rewardController = async (req, res) => {
   const { personId } = req.params;
   try {
      const statusResult = await db.transaction(async (transaction) => {
         const pointBalance = await db("pointBank")
            .select("Balance")
            .where("PersonId", personId)
            .transacting(transaction);
         const availableRewards = await db("reward").select("*").transacting(transaction);
         const claimedRewards = await db("personReward")
            .select("*")
            .where("PersonId", personId)
            .transacting(transaction);
         return {
            pointBalance,
            availableRewards,
            claimedRewards
         };
      });
      if (statusResult.pointBalance.length === 0) {
         res.status(200).json("no account");
      } else {
         res.status(200).json({
            ...statusResult,
            pointBalance: statusResult.pointBalance[0].Balance
         });
      }
   } catch (error) {
      res.status(500).json({
         error: `Error retrieving reward status for person with id '${personId}': ${error.stack}`
      });
   }
};

export const claimRewardController = async (req, res) => {
   const { personId, rewardId } = req.params;
   try {
      const statusResult = await db.transaction(async (transaction) => {
         const pointBalanceResult = await db("pointBank")
            .select("Balance")
            .where("PersonId", personId)
            .transacting(transaction);
         if (pointBalanceResult.length === 0) {
            return {
               pointBalance: null,
               availableRewards: null,
               claimedRewards: null,
               personFound: false,
               claimSuccessful: false
            };
         }
         const pointBalanceStart = pointBalanceResult[0].Balance;
         const availableRewards = await db("reward").select("*").transacting(transaction);
         const requestedRewards = availableRewards.filter((reward) => reward.RewardId === rewardId);
         if (requestedRewards.length === 0) {
            return {
               pointBalance: pointBalanceStart,
               availableRewards: null,
               claimedRewards: null,
               personFound: true,
               rewardFound: false,
               claimSuccessful: false
            };
         }
         const requestedReward = requestedRewards[0];
         const requestedRewardQuantity = requestedReward.Quantity;
         const requestedRewardPoints = requestedReward.Points;
         const alreadyClaimedRewards = await db("personReward")
            .select("*")
            .where("RewardId", rewardId)
            .where("PersonId", personId)
            .transacting(transaction);
         const newPoints = pointBalanceStart - requestedReward.Points;

         if (newPoints >= 0) {
            await db("pointBank")
               .where("PersonId", personId)
               .update("Balance", newPoints)
               .transacting(transaction);
            if (alreadyClaimedRewards.length === 0) {
               await db("personReward")
                  .insert({ ...requestedReward, personId })
                  .transacting(transaction);
            } else {
               const updatedReward = {
                  ...alreadyClaimedRewards[0],
                  Quantity: alreadyClaimedRewards[0].Quantity + requestedRewardQuantity,
                  Points: alreadyClaimedRewards[0].Points + requestedRewardPoints
               };
               await db("personReward")
                  .where("PersonId", personId)
                  .where("RewardId", rewardId)
                  .update(updatedReward)
                  .transacting(transaction);
            }
         }

         const updatedPointResult = await db("pointBank")
            .select("Balance")
            .where("PersonId", personId)
            .transacting(transaction);
         const updatedPoints = updatedPointResult[0].Balance;
         const claimedRewards = await db("personReward")
            .select("*")
            .where("PersonId", personId)
            .transacting(transaction);
         return {
            pointBalance: updatedPoints,
            availableRewards,
            claimedRewards,
            personFound: true,
            rewardFound: true,
            claimSuccessful: newPoints >= 0
         };
      });
      if (!statusResult.personFound) {
         res.status(200).json("no account");
      } else if (!statusResult.rewardFound) {
         res.status(200).json("reward not found");
      } else {
         res.status(200).json(statusResult);
      }
   } catch (error) {
      res.status(500).json({
         error: `Error claiming reward: ${error.stack}`
      });
   }
};

export const unClaimRewardController = async (req, res) => {
   const { personId, rewardId } = req.params;
   try {
      const statusResult = await db.transaction(async (transaction) => {
         const pointBalanceResult = await db("pointBank")
            .select("Balance")
            .where("PersonId", personId)
            .transacting(transaction);
         if (pointBalanceResult.length === 0) {
            return {
               pointBalance: null,
               availableRewards: null,
               claimedRewards: null,
               personFound: false,
               rewardFound: false,
               success: false
            };
         }
         const pointBalanceStart = pointBalanceResult[0].Balance;
         const alreadyClaimedRewards = await db("personReward")
            .select("*")
            .where("RewardId", rewardId)
            .where("PersonId", personId)
            .transacting(transaction);
         if (alreadyClaimedRewards.length === 0) {
            return {
               pointBalance: pointBalanceStart,
               availableRewards: null,
               claimedRewards: null,
               personFound: true,
               rewardFound: false,
               success: false
            };
         }
         const relinquishedReward = alreadyClaimedRewards[0];
         const newPoints = pointBalanceStart + relinquishedReward.Points;
         await db("pointBank")
            .where("PersonId", personId)
            .update("Balance", newPoints)
            .transacting(transaction);
         await db("personReward")
            .where("PersonId", personId)
            .where("RewardId", rewardId)
            .del()
            .transacting(transaction);
         const updatedPointResult = await db("pointBank")
            .select("Balance")
            .where("PersonId", personId)
            .transacting(transaction);
         const updatedPoints = updatedPointResult[0].Balance;
         const availableRewards = await db("reward").select("*").transacting(transaction);
         const claimedRewards = await db("personReward")
            .select("*")
            .where("PersonId", personId)
            .transacting(transaction);
         return {
            pointBalance: updatedPoints,
            availableRewards,
            claimedRewards,
            personFound: true,
            rewardFound: true,
            success: true
         };
      });
      if (!statusResult.personFound) {
         res.status(200).json("no account");
      } else if (!statusResult.rewardFound) {
         res.status(200).json("reward not found");
      } else {
         res.status(200).json(statusResult);
      }
   } catch (error) {
      res.status(500).json({
         error: `Error claiming reward: ${error.stack}`
      });
   }

   //    try {
   //       const updatedPointsResult = await db.transaction(async (transaction) => {
   //          const originalPointsResult = await db("pointBank")
   //             .select("Balance")
   //             .where("PersonId", personId)
   //             .transacting(transaction);

   //          await db("pointBank")
   //             .where("PersonId", personId)
   //             .update("Balance", originalPointsResult[0].Balance - 1)
   //             .transacting(transaction);

   //          const result = await db("pointBank")
   //             .select("Balance")
   //             .where("PersonId", personId)
   //             .transacting(transaction);

   //          return result;
   //       });
   //       if (updatedPointsResult.length === 0) {
   //          res.status(200).json("no account");
   //       } else {
   //          res.status(200).json(updatedPointsResult[0].Balance);
   //       }
   //    } catch (error) {
   //       res.status(500).json({
   //          error: `Error incrementing point balance for person with id '${personId}': ${error.stack}`
   //       });
   //    }
};

rewardRouter.get("/personId=:personId", rewardController);
rewardRouter.post("/claim/personId=:personId,rewardId=:rewardId", claimRewardController);
rewardRouter.post("/unclaim/personId=:personId,rewardId=:rewardId", unClaimRewardController);
