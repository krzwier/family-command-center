import db from "../../database/db-config";

beforeAll(async () => {
   await db.migrate.latest();
});

test("select users", async () => {
   let users = await db.from("users").select("name");
   expect(users.length).toEqual(0);
});
