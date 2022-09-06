import { personController } from "./PersonController";
import {
   knexMock,
   queryBuilder
} from "../../database/db-config";
import Chance from "chance";

jest.mock("knex");
const chance = Chance();

const mockResponse = () => {
   const res = {};
   res.status = jest.fn().mockReturnValue(res);
   res.json = jest.fn().mockReturnValue(res);
   return res;
};

afterEach(jest.clearAllMocks);

test("get should call for database table 'person'", async () => {
   const res = mockResponse();

   await personController({}, res);

   expect(knexMock).toHaveBeenCalledWith("person");
});

test("get should return 200", async () => {
   const res = mockResponse();

   await personController({}, res);

   expect(res.status).toHaveBeenCalledWith(200);
});

test("get should return correct body", async () => {
   const expectedPersons = [
      {
         PersonId: chance.integer(),
         PersonName: chance.string(),
         AvatarPath: chance.string()
      }
   ];
   queryBuilder.then = jest.fn((done) =>
      done(expectedPersons)
   );
   const res = mockResponse();

   await personController({}, res);

   expect(res.json).toHaveBeenCalledWith({
      persons: expectedPersons
   });
});

test("when database query errors should return 500", async () => {
   queryBuilder.then = jest.fn((done) => {
      throw new Error();
   });
   const res = mockResponse();

   await personController({}, res);

   expect(res.status).toHaveBeenCalledWith(500);
});
