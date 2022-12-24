import express from 'express';
import { db } from '../../database/db-config.js';

export const pointRouter = express.Router();

export const pointController = async (req, res) => {
	const { personId } = req.params;
	try {
		const result = await db.select('Balance')
			.from('pointBank')
			.where('PersonId', personId);
		if (result.length === 0) {
			res.status(200).json('no account');
		} else {
			res.status(200).json(result[0].Balance);
		}
	} catch (error) {
		res.status(500).json({
			error: `Error retrieving balance for person with id '${personId}': ${error.stack}`,
		});
	}
};

export const incrementPointsController = async (req, res) => {
	const { personId } = req.params;
	try {
		const updatedPointsResult = await db.transaction(async (transaction) => {
			const originalPointsResult = await db('pointBank')
				.select('Balance')
				.where('PersonId', personId)
				.transacting(transaction);

			await db('pointBank')
				.where('PersonId', personId)
				.update('Balance', originalPointsResult[0].Balance + 1)
				.transacting(transaction);

			const result = await db('pointBank')
				.select('Balance')
				.where('PersonId', personId)
				.transacting(transaction);

			return result;
		});
		if (updatedPointsResult.length === 0) {
			res.status(200).json('no account');
		} else {
			res.status(200).json(updatedPointsResult[0].Balance);
		}
	} catch (error) {
		res.status(500).json({
			error: `Error incrementing point balance for person with id '${personId}': ${error.stack}`,
		});
	}
};

export const decrementPointsController = async (req, res) => {
	const { personId } = req.params;
	try {
		const updatedPointsResult = await db.transaction(async (transaction) => {
			const originalPointsResult = await db('pointBank')
				.select('Balance')
				.where('PersonId', personId)
				.transacting(transaction);

			await db('pointBank')
				.where('PersonId', personId)
				.update('Balance', originalPointsResult[0].Balance - 1)
				.transacting(transaction);

			const result = await db('pointBank')
				.select('Balance')
				.where('PersonId', personId)
				.transacting(transaction);

			return result;
		});
		if (updatedPointsResult.length === 0) {
			res.status(200).json('no account');
		} else {
			res.status(200).json(updatedPointsResult[0].Balance);
		}
	} catch (error) {
		res.status(500).json({
			error: `Error incrementing point balance for person with id '${personId}': ${error.stack}`,
		});
	}
};

pointRouter.get('/personId=:personId', pointController);
pointRouter.post('/increment/personId=:personId', incrementPointsController);
pointRouter.post('/decrement/personId=:personId', decrementPointsController);
