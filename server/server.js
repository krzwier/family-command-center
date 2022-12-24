import express from 'express';
import { personsRouter } from './controllers/PersonController.js';
import { tasksRouter } from './controllers/TaskController.js';
import cors from 'cors';
import { routinesRouter } from './controllers/RoutineController.js';
import { moneyRouter } from './controllers/MoneyController.js';
import { pointRouter } from './controllers/PointController.js';
import { rewardRouter } from './controllers/RewardController.js';

const server = express();

server.get('/', (req, res) => {
	res.send('<h1>Welcome to my server!</h1>');
});

server.use(
	cors({
		origin: 'http://localhost:3000'
	})
);

server.use('/persons', personsRouter);
server.use('/tasks', tasksRouter);
server.use('/routines', routinesRouter);
server.use('/moneyBalance', moneyRouter);
server.use('/pointBalance', pointRouter);
server.use('/rewards', rewardRouter);

export default server;
