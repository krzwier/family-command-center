import express from 'express';
import { db } from '../../database/db-config.js';

export const rewardRouter = express.Router();

export const rewardController = async (req, res) => {
	const { personId } = req.params;
	try {
		const statusResult = await db.transaction(async (transaction) => {
			const pointBalance = await db('pointBank')
				.select('Balance')
				.where('PersonId', personId)
				.first()
				.transacting(transaction);
			const availableRewards = await db('reward')
				.select('*')
				.transacting(transaction);
			const claimedRewards = await db('personReward')
				.select('*')
				.where('PersonId', personId)
				.transacting(transaction);
			return {
				pointBalance: pointBalance?.Balance,
				availableRewards,
				claimedRewards,
			};
		});
		if (statusResult.pointBalance === undefined) {
			res.status(200).json({
				pointBalance: null,
				availableRewards: null,
				claimedRewards: null,
				personFound: false,
				success: false,
			});
		} else {
			res.status(200).json({
				...statusResult,
				personFound: true,
				success: true,
			});
		}
	} catch (error) {
		res.status(500).json({
			error: `Error retrieving reward status for person with id '${personId}': ${error.stack}`,
		});
	}
};

export const claimRewardController = async (req, res) => {
	const { personId, rewardId } = req.params;
	try {
		const statusResult = await db.transaction(async (transaction) => {
			const result = {
				pointBalance: null,
				availableRewards: null,
				claimedRewards: null,
				personFound: false,
				success: false,
			};
			const pointBalanceResult = await db('pointBank')
				.select('Balance')
				.where({ PersonId: personId })
				.first()
				.transacting(transaction);
			if (pointBalanceResult === undefined) {
				return result;
			}
			result.personFound = true;
			result.pointBalance = pointBalanceResult.Balance;
			result.availableRewards = await db('reward')
				.select('*')
				.transacting(transaction);
			result.claimedRewards = await db('personReward')
				.select('*')
				.where('PersonId', personId)
				.transacting(transaction);
			const requestedReward = result.availableRewards.find(
				(reward) => (reward['RewardId'] == rewardId),
			);
			if (requestedReward === undefined) {
				return result;
			}
			const newPoints = result.pointBalance - requestedReward.Points;
			if (newPoints >= 0) {
				const alreadyClaimedReward = await db('personReward')
					.select('*')
					.where('RewardId', rewardId)
					.where('PersonId', personId)
					.first()
					.transacting(transaction);
				await db('pointBank')
					.where('PersonId', personId)
					.update('Balance', newPoints)
					.transacting(transaction);
				if (alreadyClaimedReward === undefined) {
					await db('personReward')
						.insert({ ...requestedReward, personId })
						.transacting(transaction);
				} else {
					const updatedReward = {
						...alreadyClaimedReward,
						Quantity: alreadyClaimedReward.Quantity + requestedReward.Quantity,
						Points: alreadyClaimedReward.Points + requestedReward.Points,
					};
					await db('personReward')
						.where('PersonId', personId)
						.where('RewardId', rewardId)
						.update(updatedReward)
						.transacting(transaction);
				}
			}

			const updatedPointResult = await db('pointBank')
				.select('Balance')
				.where('PersonId', personId)
				.transacting(transaction);
			const updatedPoints = updatedPointResult[0].Balance;
			const claimedRewards = await db('personReward')
				.select('*')
				.where('PersonId', personId)
				.transacting(transaction);
			return {
				...result,
				pointBalance: updatedPoints,
				claimedRewards,
				success: newPoints >= 0,
			};
		});

		res.status(200).json(statusResult);
	} catch (error) {
		res.status(500).json({
			error: `Error claiming reward: ${error.stack}`,
		});
	}
};

export const unClaimRewardController = async (req, res) => {
	const { personId, rewardId } = req.params;
	try {
		const statusResult = await db.transaction(async (transaction) => {
			const result = {
				pointBalance: null,
				availableRewards: null,
				claimedRewards: null,
				personFound: false,
				success: false,
			};
			const pointBalanceResult = await db('pointBank')
				.select('Balance')
				.where({ PersonId: personId })
				.first()
				.transacting(transaction);
			if (pointBalanceResult === undefined) {
				return result;
			}
			result.pointBalance = pointBalanceResult.Balance;
			result.availableRewards = await db('reward')
				.select('*')
				.transacting(transaction);
			const alreadyClaimedRewards = await db('personReward')
				.select('*')
				.where('PersonId', personId)
				.transacting(transaction);
			const relinquishedReward = alreadyClaimedRewards.find((reward) => reward.RewardId == rewardId);
			if (relinquishedReward === undefined) {
				return {
					...result,
					claimedRewards: alreadyClaimedRewards,
					personFound: true,
					success: false,
				};
			}
			const newPoints = result.pointBalance + relinquishedReward.Points;
			await db('pointBank')
				.where('PersonId', personId)
				.update('Balance', newPoints)
				.transacting(transaction);
			await db('personReward')
				.where('PersonId', personId)
				.where('RewardId', rewardId)
				.del()
				.transacting(transaction);
			const updatedPointResult = await db('pointBank')
				.select('Balance')
				.where('PersonId', personId)
				.transacting(transaction);
			const updatedPoints = updatedPointResult[0].Balance;
			const availableRewards = await db('reward').select('*')
				.transacting(transaction);
			const claimedRewards = await db('personReward')
				.select('*')
				.where('PersonId', personId)
				.transacting(transaction);
			return {
				pointBalance: updatedPoints,
				availableRewards,
				claimedRewards,
				personFound: true,
				success: true,
			};
		});
		
		res.status(200).json(statusResult);
		
	} catch (error) {
		res.status(500).json({
			error: `Error relinquishing reward: ${error.stack}`,
		});
	}
};

rewardRouter.get('/personId=:personId', rewardController);
rewardRouter.post('/claim/personId=:personId,rewardId=:rewardId', claimRewardController);
rewardRouter.post('/unclaim/personId=:personId,rewardId=:rewardId', unClaimRewardController);
