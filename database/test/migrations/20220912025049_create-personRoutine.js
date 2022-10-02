export const up = (knex) => {
   return knex.schema.createTable(
      "personRoutine",
      (tbl) => {
         tbl.integer("PersonId").notNullable();
         tbl.integer("RoutineId").notNullable();
      }
   );
};

export const down = (knex) => {
   return knex.schema.dropTableIfExists("personRoutine");
};
