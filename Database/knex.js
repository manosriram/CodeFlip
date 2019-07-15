const options =
  process.env.NODE_ENV === "production"
    ? {
        client: "pg",
        debug: true,
        connection: process.env.DATABASE_URL,
        migrations: {
          tableName: "migrations"
        },
        ssl: true
      }
    : {
        client: "mysql",
        connection: {
          hostnane: "localhost",
          user: "root",
          password: "",
          database: "flipcode"
        }
      };

const knex = require("knex")(options);

module.exports = knex;
