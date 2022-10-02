export const allPersonRoutines = [
   {
      PersonId: 1,
      RoutineId: 0
   },
   {
      PersonId: 1,
      RoutineId: 1
   },
   {
      PersonId: 1,
      RoutineId: 2
   }
];

export const seed = async (knex) => {
   await knex("personRoutine").del();
   await knex("personRoutine").insert(allPersonRoutines);
};
