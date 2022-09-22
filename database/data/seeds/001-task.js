export const allTasks = [
   {
      TaskId: 0,
      TaskDescription: "Brush Teeth",
      IconPath: "./resources/Icons/toothbrush.png"
   },
   {
      TaskId: 1,
      TaskDescription: "Get Dressed",
      IconPath: "./resources/Icons/clothes.png"
   },
   {
      TaskId: 2,
      TaskDescription: "Eat Breakfast",
      IconPath: "./resources/Icons/breakfast.png"
   },
   {
      TaskId: 3,
      TaskDescription: "Take Medicine",
      IconPath: "./resources/Icons/medicine.png"
   },
   {
      TaskId: 4,
      TaskDescription: "Fill & Pack Water Bottle",
      IconPath: "./resources/Icons/bottle.png"
   }
];

export const seed = async (knex) => {
   await knex("task").del();
   await knex("task").insert(allTasks);
};
