export const allPoints = [
   {
      PersonId: 15,
      Balance: 34
   },
   {
      PersonId: 82,
      Balance: 2
   }
];

export const seed = async (knex) => {
   await knex("pointBank").del();
   await knex("pointBank").insert(allPoints);
};
