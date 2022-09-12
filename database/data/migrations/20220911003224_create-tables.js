export const up = (knex) => {
   return knex.schema.createTable("person", (tbl) => {
      tbl.integer("PersonId").notNullable();
      tbl.string("PersonName").notNullable();
      tbl.string("AvatarPath").notNullable();
   });
};

export const down = (knex) => {
   return knex.schema.dropTableIfExists("person");
};
