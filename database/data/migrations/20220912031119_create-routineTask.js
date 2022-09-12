export const up = (knex) => {
   return knex.schema.createTable("routineTask", (tbl) => {
      tbl.integer("RoutineId").notNullable();
      tbl.integer("TaskId").notNullable();
   });
};

export const down = (knex) => {
   return knex.schema.dropTableIfExists("routineTask");
};
