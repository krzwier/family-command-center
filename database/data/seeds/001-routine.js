export const allRoutines = [
	{
		RoutineId: 0,
		RoutineName: `Claire's Before School Routine`,
		RoutineDisplayName: 'Before-School Routine',
		StartHour: 6,
		EndHour: 12,
		IconPath: './resources/Icons/alarm-clock.png',
		ActiveOnSchoolDays: true,
		ActiveOnNonSchoolDays: false,
		Completed: false
	},
	{
		RoutineId: 1,
		RoutineName: `Claire's After School Routine`,
		RoutineDisplayName: 'After-School Routine',
		StartHour: 12,
		EndHour: 23,
		IconPath: './resources/Icons/after-school.png',
		ActiveOnSchoolDays: true,
		ActiveOnNonSchoolDays: false,
		Completed: false
	},
	{
		RoutineId: 2,
		RoutineName: `Claire's Bedtime Routine`,
		RoutineDisplayName: 'Bedtime Routine',
		StartHour: 20,
		EndHour: 24,
		IconPath: './resources/Icons/bedtime.png',
		ActiveOnSchoolDays: true,
		ActiveOnNonSchoolDays: true,
		Completed: false
	},
	{
		RoutineId: 3,
		RoutineName: `Claire's Morning Routine`,
		RoutineDisplayName: 'Morning Routine',
		StartHour: 6,
		EndHour: 12,
		IconPath: './resources/Icons/morning.png',
		ActiveOnSchoolDays: false,
		ActiveOnNonSchoolDays: true,
		Completed: false
	},
	{
		RoutineId: 4,
		RoutineName: `Josh's Before School Routine`,
		RoutineDisplayName: 'Before-School Routine',
		StartHour: 6,
		EndHour: 12,
		IconPath: './resources/Icons/alarm-clock.png',
		ActiveOnSchoolDays: true,
		ActiveOnNonSchoolDays: false,
		Completed: false
	},
	{
		RoutineId: 5,
		RoutineName: `Josh's After School Routine`,
		RoutineDisplayName: 'After-School Routine',
		StartHour: 12,
		EndHour: 23,
		IconPath: './resources/Icons/after-school.png',
		ActiveOnSchoolDays: true,
		ActiveOnNonSchoolDays: false,
		Completed: false
	},
	{
		RoutineId: 6,
		RoutineName: `Josh's Bedtime Routine`,
		RoutineDisplayName: 'Bedtime Routine',
		StartHour: 20,
		EndHour: 24,
		IconPath: './resources/Icons/bedtime.png',
		ActiveOnSchoolDays: true,
		ActiveOnNonSchoolDays: true,
		Completed: false
	},
	{
		RoutineId: 7,
		RoutineName: `Josh's Morning Routine`,
		RoutineDisplayName: 'Morning Routine',
		StartHour: 6,
		EndHour: 12,
		IconPath: './resources/Icons/morning.png',
		ActiveOnSchoolDays: false,
		ActiveOnNonSchoolDays: true,
		Completed: false
	},
	{
		RoutineId: 8,
		RoutineName: `Ben's Before School Routine`,
		RoutineDisplayName: 'Before-School Routine',
		StartHour: 6,
		EndHour: 12,
		IconPath: './resources/Icons/alarm-clock.png',
		ActiveOnSchoolDays: true,
		ActiveOnNonSchoolDays: false,
		Completed: false
	},
	{
		RoutineId: 9,
		RoutineName: `Ben's After School Routine`,
		RoutineDisplayName: 'After-School Routine',
		StartHour: 12,
		EndHour: 23,
		IconPath: './resources/Icons/after-school.png',
		ActiveOnSchoolDays: true,
		ActiveOnNonSchoolDays: false,
		Completed: false
	},
	{
		RoutineId: 10,
		RoutineName: `Ben's Bedtime Routine`,
		RoutineDisplayName: 'Bedtime Routine',
		StartHour: 20,
		EndHour: 24,
		IconPath: './resources/Icons/bedtime.png',
		ActiveOnSchoolDays: true,
		ActiveOnNonSchoolDays: true,
		Completed: false
	},
	{
		RoutineId: 11,
		RoutineName: `Ben's Morning Routine`,
		RoutineDisplayName: 'Morning Routine',
		StartHour: 6,
		EndHour: 12,
		IconPath: './resources/Icons/morning.png',
		ActiveOnSchoolDays: false,
		ActiveOnNonSchoolDays: true,
		Completed: false
	},
	{
		RoutineId: 12,
		RoutineName: `Hannah's Before School Routine`,
		RoutineDisplayName: 'Before-School Routine',
		StartHour: 6,
		EndHour: 12,
		IconPath: './resources/Icons/alarm-clock.png',
		ActiveOnSchoolDays: true,
		ActiveOnNonSchoolDays: false,
		Completed: false
	},
	{
		RoutineId: 13,
		RoutineName: `Hannah's After School Routine`,
		RoutineDisplayName: 'After-School Routine',
		StartHour: 12,
		EndHour: 23,
		IconPath: './resources/Icons/after-school.png',
		ActiveOnSchoolDays: true,
		ActiveOnNonSchoolDays: false,
		Completed: false
	},
	{
		RoutineId: 14,
		RoutineName: `Hannah's Bedtime Routine`,
		RoutineDisplayName: 'Bedtime Routine',
		StartHour: 20,
		EndHour: 24,
		IconPath: './resources/Icons/bedtime.png',
		ActiveOnSchoolDays: true,
		ActiveOnNonSchoolDays: true,
		Completed: false
	},
	{
		RoutineId: 15,
		RoutineName: `Hannah's Morning Routine`,
		RoutineDisplayName: 'Morning Routine',
		StartHour: 6,
		EndHour: 12,
		IconPath: './resources/Icons/morning.png',
		ActiveOnSchoolDays: false,
		ActiveOnNonSchoolDays: true,
		Completed: false
	}
];

export const seed = async (knex) => {
	await knex('routine').del();
	await knex('routine').insert(allRoutines);
};
