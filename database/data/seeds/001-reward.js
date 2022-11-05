export const allTasks = [
   {
      RewardId: 0,
      TaskDescription: "$10 Arcade Trip",
      Cost: 100,
      IconPath: "./resources/Icons/arcade.png"
   }
];

export const seed = async (knex) => {
   await knex("task").del();
   await knex("task").insert(allTasks);
};
