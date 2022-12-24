import express from 'express';
import { db } from '../../database/db-config.js';

export const moneyRouter = express.Router();

const moneyController = async (req, res) => {
	const { personId } = req.params;
	try {
		const result = await db.select('Balance').from('moneyBank')
			.where('PersonId', personId);
		return result.length === 0
			? res.status(200).json('no account')
			: res.status(200).json(result[0].Balance);
	} catch (error) {
		res.status(500).json({
			error: `Error retrieving balance for personId '${personId}': ${error.stack}`,
		});
	}
};

moneyRouter.get('/personId=:personId', moneyController);
