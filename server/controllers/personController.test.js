import { personController, singlePersonController } from "./PersonController";
import { allPersons } from "../../database/test/seeds/002-person";
import { db } from "../../database/db-config";
import { jest } from "@jest/globals";
import { createResponse, createRequest } from "node-mocks-http";

beforeAll(async () => {
   await db.migrate.latest();
   await db.seed.run();
});

afterEach(jest.restoreAllMocks);

afterAll(async () => {
   db.destroy();
});

describe("personController", () => {
   test("when query returns successfully should return 200 with result", async () => {
      const res = createResponse();

      await personController({}, res);

      const status = res._getStatusCode();
      const body = res._getJSONData();
      expect(status).toBe(200);
      expect(body).toEqual({ persons: allPersons });
   });

   test("when database throws error should return 500 with message", async () => {
      jest.spyOn(db.context, "queryBuilder").mockImplementation((done) => {
         throw new Error();
      });
      const res = createResponse();

      await personController({}, res);

      const status = res._getStatusCode();
      const { error } = res._getJSONData();
      expect(status).toBe(500);
      expect(error).toMatch(/^error retrieving persons/i);
   });
});

describe("singlePersonController", () => {
   test.each([15, 82])(
      "when specific person id requested should return 200 with correct result",
      async (id) => {
         const response = createResponse();
         const request = createRequest();
         request.params.personId = id;
         const expectedPerson = allPersons.filter((person) => person.PersonId === id)[0];

         await singlePersonController(request, response);

         expect(response._getStatusCode()).toBe(200);
         expect(response._getJSONData()).toEqual(expectedPerson);
      }
   );

   test("when database throws error should return 500 with message", async () => {
      jest.spyOn(db.context, "queryBuilder").mockImplementation((done) => {
         throw new Error();
      });
      const response = createResponse();
      const request = createRequest();
      request.params.personId = 15;

      await singlePersonController(request, response);

      expect(response._getStatusCode()).toBe(500);
      expect(response._getJSONData().error).toMatch(/^error retrieving person with id '15'/i);
   });
});
