import { useState, useEffect, useCallback } from 'react';
import { callFunction } from '../services/CallFunction.js';

export const useTasks = (
	routineId,
	incrementPointBalance,
	decrementPointBalance,
	routineIsComplete,
) => {
	const [tasks, setTasks] = useState([]);
	const [listIsComplete, setListIsComplete] = useState(routineIsComplete);

	useEffect(() => {
		callFunction(`gettasksforroutine/routineid=${routineId}`)
			.then((data) => {
				const incomingTasks = data.map((task) => ({
					...task,
					completed: routineIsComplete,
				}));
				setTasks(incomingTasks);
			});
	}, [routineId, setTasks]);

	const toggleTaskCompletion = useCallback(
		(taskId) => {
			const updatedTasks = tasks.map((task) => ({
				...task,
				completed: task.TaskId === taskId ? !task.completed : task.completed,
			}));
			const routineComplete = updatedTasks.filter((task) => !task.completed).length === 0;
			saveRoutineCompletion(routineComplete);
			if (routineComplete && !listIsComplete) {
				incrementPointBalance();
			}
			if (!routineComplete && listIsComplete) {
				decrementPointBalance();
			}
			setTasks(updatedTasks);
			setListIsComplete(routineComplete);
		},
		[tasks, setTasks, listIsComplete, setListIsComplete],
	);

	const saveRoutineCompletion = useCallback(
		(isCompleted) => callFunction(`completeroutine/routineid=${routineId},status=${
			isCompleted ? 1 : 0
		}`),
		[routineId],
	);

	return { tasks, toggleTaskCompletion, listIsComplete };
};
