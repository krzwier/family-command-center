export const allPersons = [
   {
      PersonId: 0,
      PersonName: "Mommy",
      AvatarPath: "./resources/Avatars/Mommy.svg"
   },
   {
      PersonId: 1,
      PersonName: "Claire",
      AvatarPath: "./resources/Avatars/Claire.svg"
   },
   {
      PersonId: 2,
      PersonName: "Josh",
      AvatarPath: "./resources/Avatars/Josh.svg"
   },
   {
      PersonId: 3,
      PersonName: "Ben",
      AvatarPath: "./resources/Avatars/Ben.svg"
   },
   {
      PersonId: 4,
      PersonName: "Hannah",
      AvatarPath: "./resources/Avatars/Hannah.svg"
   }
];

export const seed = async (knex) => {
   await knex("person").del();
   await knex("person").insert(allPersons);
};
