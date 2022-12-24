import express from 'express';
import { db } from '../../database/db-config.js';

export const routinesRouter = express.Router();

const routinesForPersonController = async (req, res) => {
	const { personId, hour, isSchoolDay } = req.params;
	try {
		const routines = await db.raw(`SELECT * FROM routine r
         JOIN personRoutine pr ON r.RoutineId = pr.RoutineId
         WHERE pr.PersonId = ${personId}
         AND ((r.ActiveOnSchoolDays = 1 AND ${isSchoolDay} = 1)
            OR (r.ActiveOnNonSchoolDays = 1 AND ${isSchoolDay} = 0))
         AND r.StartHour <= ${hour}
         AND r.EndHour > ${hour};`);
		return res.status(200).json({ routines });
	} catch (error) {
		res.status(500).json({
			error: `Error retrieving routines for person with id '${personId}' at hour '${hour}' with isSchoolDay = ${isSchoolDay}: ${error.stack}`,
		});
	}
};

const completeRoutineController = async (req, res) => {
	const { routineId, isComplete } = req.params;
	const status = parseInt(isComplete);
	try {
		await db('routine').where('RoutineId', routineId)
			.update('Completed', status);
		res.status(200).send(
			`Status of routine ${routineId} has been saved as ${
				status === 1 ? 'completed' : 'incomplete'
			}.`,
		);
	} catch (error) {

		res.status(500).json({
			error: `Error saving completion status of routine '${routineId}': ${error.stack}`,
		});
	}
};

const resetRoutinesController = async (req, res) => {
	try {
		await db.raw('UPDATE routine SET Completed = 0;');
		console.log(`${Date()}: All routines successfully reset to incomplete.
`);
		res.status(200).send(`${Date()}: All routines successfully reset to incomplete.
`);
	} catch (error) {
		console.log(`${Date()}: Error resetting routines: ${error.stack}
`);
		res.status(500).send(`${Date()}: Error resetting routines: ${error.stack}
`);
	}
};

routinesRouter.get(
	'/person=:personId,hour=:hour,isSchoolDay=:isSchoolDay',
	routinesForPersonController,
);

routinesRouter.get(
	'/saveCompletion/routineId=:routineId,isComplete=:isComplete',
	completeRoutineController,
);

routinesRouter.get('/reset', resetRoutinesController);
