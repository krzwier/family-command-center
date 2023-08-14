import express from 'express';
import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });

export const workEventsRouter = express.Router();

export const workEventsController = async (req, res) => {
	const response = await fetch(process.env.REACT_APP_WORK_CALENDAR_URL, { method: 'GET' });
	const fileStream = fs.createWriteStream('./public/resources/workCalendar.ics');
	await new Promise((resolve, reject) => {
		response.body.pipe(fileStream);
		response.body.on('error', reject);
		fileStream.on('finish', resolve);
	});
	fileStream.close();
	res.status(200).json('download complete');
};

workEventsRouter.get('/', workEventsController);