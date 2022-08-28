import path from "path";

const config = {
   development: {
      client: "sqlite3",
      connection: {
         filename: "sqlite.db"
      },
      useNullAsDefault: true,
      migrations: {
         directory: path.join(__dirname, "migrations")
      },
      seeds: {
         directory: path.join(__dirname, "seeds")
      }
   },
   test: {
      client: "sqlite3",
      connection: ":memory:",
      useNullAsDefault: true,
      migrations: {
         directory: path.join(__dirname, "migrations")
      },
      seeds: {
         directory: path.join(__dirname, "seeds")
      }
   }
};

export default config;
