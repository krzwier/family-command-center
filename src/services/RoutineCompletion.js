export const saveRoutineCompletion = (routineId, isCompleted) => {
	fetch(
		`http://localhost:4001/routines/saveCompletion/routineId=${routineId},isComplete=${isCompleted}`,
		{
			method: 'POST',
		},
	);
};
