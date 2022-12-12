export const up = (knex) => {
   return knex.schema.createTable("reward", (tbl) => {
      tbl.integer("RewardId").notNullable();
      tbl.boolean("Money").notNullable();
      tbl.string("Description").notNullable();
      tbl.integer("Quantity").notNullable();
      tbl.integer("Points").notNullable();
      tbl.string("IconPath").notNullable();
   });
};

export const down = (knex) => {
   return knex.schema.dropTableIfExists("reward");
};
