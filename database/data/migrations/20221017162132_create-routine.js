export const up = (knex) => {
   return knex.schema.createTable("routine", (tbl) => {
      tbl.integer("RoutineId").notNullable();
      tbl.string("RoutineName").notNullable();
      tbl.string("RoutineDisplayName").notNullable();
      tbl.integer("StartHour").notNullable();
      tbl.integer("EndHour").notNullable();
      tbl.string("IconPath").notNullable();
      tbl.boolean("ActiveOnSchoolDays").notNullable();
      tbl.boolean("ActiveOnNonSchoolDays").notNullable();
      tbl.boolean("Completed").notNullable();
   });
};

export const down = (knex) => {
   return knex.schema.dropTableIfExists("routine");
};
