const config = {
   development: {
      client: "sqlite3",
      connection: {
         filename: "./database/data/family-command-center.db3"
      },
      useNullAsDefault: true,
      migrations: {
         directory: "./database/data/migrations"
      },
      seeds: {
         directory: "./database/data/seeds"
      }
   },
   test: {
      client: "sqlite3",
      connection: {
         filename: ":memory:"
      },
      useNullAsDefault: true,
      migrations: {
         directory: "./database/test/migrations"
      },
      seeds: {
         directory: "./database/test/seeds"
      }
   }
};

export default config;
