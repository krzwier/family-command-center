import knex from "knex";
import config from "../knexfile.js";

let db = null;
// let knexMock = null;
// let queryBuilder = null;
if (process.env.NODE_ENV === "test") {
   //    queryBuilder = {
   //       select: jest.fn().mockReturnThis(),
   //       from: jest.fn().mockReturnThis(),
   //       where: jest.fn().mockReturnThis()
   //    };
   //    knexMock = jest.fn().mockReturnValue(queryBuilder);
   //    knex.mockReturnValue(knexMock);
   db = knex(config.test);
} else {
   db = knex(config.development);
}

export { db };
