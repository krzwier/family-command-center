export const allPersons = [
   {
      PersonId: 0,
      PersonName: "Mommy",
      AvatarPath: "resources/Avatars/Mommy.png"
   },
   {
      PersonId: 1,
      PersonName: "Claire",
      AvatarPath: "resources/Avatars/Claire.png"
   },
   {
      PersonId: 2,
      PersonName: "Josh",
      AvatarPath: "resources/Avatars/Josh.png"
   },
   {
      PersonId: 3,
      PersonName: "Ben",
      AvatarPath: "resources/Avatars/Ben.png"
   },
   {
      PersonId: 4,
      PersonName: "Hannah",
      AvatarPath: "resources/Avatars/Hannah.png"
   }
];

export const seed = async (knex) => {
   await knex("person").del();
   await knex("person").insert(allPersons);
};
