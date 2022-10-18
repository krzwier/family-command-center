const config = {
   development: {
      client: "sqlite3",
      connection: {
         filename: "/home/krzwier/family-command-center/database/data/family-command-center.db3"
      },
      useNullAsDefault: true,
      migrations: {
         directory: "/home/krzwier/family-command-center/database/data/migrations"
      },
      seeds: {
         directory: "/home/krzwier/family-command-center/databse/data/seeds"
      }
   }
};

export default config;
