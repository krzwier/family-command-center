export const allRoutineTasks = [
   {
      RoutineId: 0,
      TaskId: 0
   },
   {
      RoutineId: 0,
      TaskId: 1
   },
   {
      RoutineId: 0,
      TaskId: 2
   },
   {
      RoutineId: 0,
      TaskId: 4
   },
   {
      RoutineId: 0,
      TaskId: 5
   },
   {
      RoutineId: 0,
      TaskId: 6
   },
   {
      RoutineId: 0,
      TaskId: 7
   },
   {
      RoutineId: 0,
      TaskId: 8
   },
   {
      RoutineId: 1,
      TaskId: 10
   },
   {
      RoutineId: 1,
      TaskId: 15
   },
   {
      RoutineId: 1,
      TaskId: 17
   },
   {
      RoutineId: 1,
      TaskId: 16
   },
   {
      RoutineId: 2,
      TaskId: 0
   },
   {
      RoutineId: 2,
      TaskId: 3
   },
   {
      RoutineId: 2,
      TaskId: 18
   }
];

export const seed = async (knex) => {
   await knex("routineTask").del();
   await knex("routineTask").insert(allRoutineTasks);
};
