export const tasks = [
    {
       TaskId: 0,
       TaskDescription: "Brush teeth",
       IconPath: "./resources/Icons/toothbrush.svg"   
    },
    {
        TaskId: 1,
        TaskDescription: "Get dressed",
        IconPath: ""
    }
    
 ];
 
 export const seed = async (knex) => {
    await knex("person").del();
    await knex("person").insert(allPersons);
 };
 