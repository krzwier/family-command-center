export const up = (knex) => {
   return knex.schema.createTable(
      "completedRoutine",
      (tbl) => {
         tbl.integer("PersonId").notNullable();
         tbl.integer("RoutineId").notNullable();
         tbl.date("Date").notNullable();
      }
   );
};

export const down = (knex) => {
   return knex.schema.dropTableIfExists("completedRoutine");
};
