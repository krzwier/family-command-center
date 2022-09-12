export const up = (knex) => {
   return knex.schema.createTable("task", (tbl) => {
      tbl.integer("TaskId").notNullable();
      tbl.integer("TaskDescription").notNullable();
      tbl.string("IconPath").notNullable();
   });
};

export const down = (knex) => {
   return knex.schema.dropTableIfExists("task");
};
