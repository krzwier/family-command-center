export const up = (knex) => {
   return knex.schema.createTable("personReward", (tbl) => {
      tbl.integer("PersonId").notNullable();
      tbl.integer("RewardId").notNullable();
      tbl.boolean("Money").notNullable();
      tbl.string("Description").notNullable();
      tbl.integer("Quantity").notNullable();
      tbl.integer("Points").notNullable();
      tbl.string("IconPath").notNullable();
   });
};

export const down = (knex) => {
   return knex.schema.dropTableIfExists("personReward");
};
