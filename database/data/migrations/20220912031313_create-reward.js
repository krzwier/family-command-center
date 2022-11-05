export const up = (knex) => {
   return knex.schema.createTable("reward", (tbl) => {
      tbl.integer("RewardId").notNullable();
      tbl.integer("RewardDescription").notNullable();
      tbl.string("IconPath").notNullable();
   });
};

export const down = (knex) => {
   return knex.schema.dropTableIfExists("reward");
};
