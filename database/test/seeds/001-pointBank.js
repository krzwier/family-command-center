export const allPoints = [
   {
      PersonId: 1,
      Balance: 0
   },
   {
      PersonId: 2,
      Balance: 0
   },
   {
      PersonId: 3,
      Balance: 0
   },
   {
      PersonId: 4,
      Balance: 0
   }
];

export const seed = async (knex) => {
   await knex("pointBank").del();
   await knex("pointBank").insert(allPoints);
};
