export const allRoutines = [
   {
      RoutineId: 0,
      RoutineName: "Claire's Before School Routine",
      RoutineDisplayName: "Before-School Routine",
      StartHour: 6,
      EndHour: 12,
      IconPath: "./resources/Icons/alarm-clock.png",
      DaysActive: "MonTueWedThuFri",
      Completed: false
   },
   {
      RoutineId: 1,
      RoutineName: "Claire's After School Routine",
      RoutineDisplayName: "After School Routine",
      StartHour: 12,
      EndHour: 23,
      IconPath: "./resources/Icons/after-school.png",
      DaysActive: "MonTueWedThuFri",
      Completed: false
   },
   {
      RoutineId: 2,
      RoutineName: "Claire's Bedtime Routine",
      RoutineDisplayName: "Bedtime Routine",
      StartHour: 20,
      EndHour: 24,
      IconPath: "./resources/Icons/bedtime.png",
      DaysActive: "SunMonTueWedThuFriSat",
      Completed: false
   }
];

export const seed = async (knex) => {
   await knex("routine").del();
   await knex("routine").insert(allRoutines);
};
