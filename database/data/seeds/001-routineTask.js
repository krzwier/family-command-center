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
   },
   {
      RoutineId: 3,
      TaskId: 0
   },
   {
      RoutineId: 3,
      TaskId: 1
   },
   {
      RoutineId: 3,
      TaskId: 2
   },
   {
      RoutineId: 3,
      TaskId: 7
   },
   {
      RoutineId: 4,
      TaskId: 0
   },
   {
      RoutineId: 4,
      TaskId: 1
   },
   {
      RoutineId: 4,
      TaskId: 2
   },
   {
      RoutineId: 4,
      TaskId: 4
   },
   {
      RoutineId: 4,
      TaskId: 5
   },
   {
      RoutineId: 4,
      TaskId: 6
   },
   {
      RoutineId: 4,
      TaskId: 7
   },
   {
      RoutineId: 4,
      TaskId: 8
   },
   {
      RoutineId: 5,
      TaskId: 10
   },
   {
      RoutineId: 5,
      TaskId: 15
   },
   {
      RoutineId: 5,
      TaskId: 17
   },
   {
      RoutineId: 5,
      TaskId: 16
   },
   {
      RoutineId: 6,
      TaskId: 0
   },
   {
      RoutineId: 6,
      TaskId: 3
   },
   {
      RoutineId: 6,
      TaskId: 18
   },
   {
      RoutineId: 7,
      TaskId: 0
   },
   {
      RoutineId: 7,
      TaskId: 1
   },
   {
      RoutineId: 7,
      TaskId: 2
   },
   {
      RoutineId: 7,
      TaskId: 7
   },
   {
      RoutineId: 8,
      TaskId: 0
   },
   {
      RoutineId: 8,
      TaskId: 1
   },
   {
      RoutineId: 8,
      TaskId: 2
   },
   {
      RoutineId: 8,
      TaskId: 4
   },
   {
      RoutineId: 8,
      TaskId: 5
   },
   {
      RoutineId: 8,
      TaskId: 6
   },
   {
      RoutineId: 8,
      TaskId: 7
   },
   {
      RoutineId: 8,
      TaskId: 8
   },
   {
      RoutineId: 9,
      TaskId: 10
   },
   {
      RoutineId: 9,
      TaskId: 15
   },
   {
      RoutineId: 9,
      TaskId: 17
   },
   {
      RoutineId: 9,
      TaskId: 16
   },
   {
      RoutineId: 10,
      TaskId: 0
   },
   {
      RoutineId: 10,
      TaskId: 3
   },
   {
      RoutineId: 10,
      TaskId: 18
   },
   {
      RoutineId: 11,
      TaskId: 0
   },
   {
      RoutineId: 11,
      TaskId: 1
   },
   {
      RoutineId: 11,
      TaskId: 2
   },
   {
      RoutineId: 11,
      TaskId: 7
   },
   {
      RoutineId: 12,
      TaskId: 0
   },
   {
      RoutineId: 12,
      TaskId: 1
   },
   {
      RoutineId: 12,
      TaskId: 2
   },
   {
      RoutineId: 12,
      TaskId: 4
   },
   {
      RoutineId: 12,
      TaskId: 5
   },
   {
      RoutineId: 12,
      TaskId: 6
   },
   {
      RoutineId: 12,
      TaskId: 7
   },
   {
      RoutineId: 12,
      TaskId: 8
   },
   {
      RoutineId: 13,
      TaskId: 10
   },
   {
      RoutineId: 13,
      TaskId: 15
   },
   {
      RoutineId: 13,
      TaskId: 17
   },
   {
      RoutineId: 13,
      TaskId: 16
   },
   {
      RoutineId: 14,
      TaskId: 0
   },
   {
      RoutineId: 14,
      TaskId: 3
   },
   {
      RoutineId: 14,
      TaskId: 18
   },
   {
      RoutineId: 15,
      TaskId: 0
   },
   {
      RoutineId: 15,
      TaskId: 1
   },
   {
      RoutineId: 15,
      TaskId: 2
   },
   {
      RoutineId: 15,
      TaskId: 7
   }
];

export const seed = async (knex) => {
   await knex("routineTask").del();
   await knex("routineTask").insert(allRoutineTasks);
};
