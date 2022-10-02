export const up = (knex) => {
   return knex.schema.createTable("dateRoutine", (tbl) => {
      tbl.date("Date").notNullable();
      tbl.integer("RoutineId").notNullable();
      tbl.boolean("Done").notNullable();
   });
};

export const down = (knex) => {
   return knex.schema.dropTableIfExists("dateRoutine");
};
