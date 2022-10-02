export const allPersons = [
   {
      PersonId: 15,
      PersonName: "Person 15",
      AvatarPath: "path for person 15"
   },
   {
      PersonId: 82,
      PersonName: "Person 82",
      AvatarPath: "path for person 82"
   }
];

export const seed = async (knex) => {
   await knex("person").del();
   await knex("person").insert(allPersons);
};
