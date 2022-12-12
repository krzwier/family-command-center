export const allPoints = [
   {
      PersonId: 15,
      Balance: 197
   },
   {
      PersonId: 82,
      Balance: 34
   }
];

export const seed = async (knex) => {
   await knex("pointBank").del();
   await knex("pointBank").insert(allPoints);
};
