export const allRoutines = [
   {
      RoutineId: 0,
      RoutineName: "Claire's Before School Routine",
      RoutineDisplayName: "Before-School Routine",
      StartHour: 6,
      EndHour: 12,
      IconPath: "./resources/Icons/alarm-clock.png",
      ActiveOnNonSchoolDays: false,
      Completed: false
   },
   {
      RoutineId: 1,
      RoutineName: "Claire's After School Routine",
      RoutineDisplayName: "After-School Routine",
      StartHour: 12,
      EndHour: 23,
      IconPath: "./resources/Icons/after-school.png",
      ActiveOnNonSchoolDays: false,
      Completed: false
   },
   {
      RoutineId: 2,
      RoutineName: "Claire's Bedtime Routine",
      RoutineDisplayName: "Bedtime Routine",
      StartHour: 20,
      EndHour: 24,
      IconPath: "./resources/Icons/bedtime.png",
      ActiveOnNonSchoolDays: true,
      Completed: false
   },
   {
      RoutineId: 3,
      RoutineName: "Claire's Morning Routine",
      RoutineDisplayName: "Morning Routine",
      StartHour: 6,
      EndHour: 12,
      IconPath: "./resources/Icons/morning.png",
      ActiveOnNonSchoolDays: true,
      Completed: false
   }
];

export const seed = async (knex) => {
   await knex("routine").del();
   await knex("routine").insert(allRoutines);
};
