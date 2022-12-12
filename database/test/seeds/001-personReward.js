export const allPersonRewards = [
   {
      PersonId: 15,
      RewardId: 64,
      Money: 1,
      Description: "Funny Money",
      Quantity: 7,
      Points: 32,
      IconPath: "./resources/Icons/funny.png"
   },
   {
      PersonId: 82,
      RewardId: 29,
      Money: 0,
      Description: "Cool Thing",
      Quantity: 1,
      Points: 92,
      IconPath: "./resources/Icons/cool.png"
   }
];

export const seed = async (knex) => {
   await knex("personReward").del();
   await knex("personReward").insert(allPersonRewards);
};
