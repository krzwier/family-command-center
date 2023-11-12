export const allPersonRoutines = [
	{
		PersonId: 1,
		RoutineId: 0,
	},
	{
		PersonId: 1,
		RoutineId: 1,
	},
	{
		PersonId: 1,
		RoutineId: 2,
	},
	{
		PersonId: 1,
		RoutineId: 3,
	},
	{
		PersonId: 2,
		RoutineId: 4,
	},
	{
		PersonId: 2,
		RoutineId: 5,
	},
	{
		PersonId: 2,
		RoutineId: 6,
	},
	{
		PersonId: 2,
		RoutineId: 7,
	},
	{
		PersonId: 3,
		RoutineId: 8,
	},
	{
		PersonId: 3,
		RoutineId: 9,
	},
	{
		PersonId: 3,
		RoutineId: 10,
	},
	{
		PersonId: 3,
		RoutineId: 11,
	},
	{
		PersonId: 4,
		RoutineId: 12,
	},
	{
		PersonId: 4,
		RoutineId: 13,
	},
	{
		PersonId: 4,
		RoutineId: 14,
	},
	{
		PersonId: 4,
		RoutineId: 15,
	},
];

export const seed = async (knex) => {
	await knex('personRoutine').del();
	await knex('personRoutine').insert(allPersonRoutines);
};
