require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DATABASE_HOST || "127.0.0.1",
      database: process.env.DATABASE_NAME || "meetdb",
      user: process.env.DATABASE_USER || "meetuser",
      password: process.env.DATABASE_PASSWORD || "password",
    },

    migrations: {
      database: process.env.DATABASE_NAME || "meetdb",
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      host: process.env.DATABASE_HOST || "127.0.0.1",
      database: process.env.DATABASE_NAME || "meetdb",
      user: process.env.DATABASE_USER || "meetuser",
      password: process.env.DATABASE_PASSWORD || "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      database: process.env.DATABASE_NAME || "meetdb",
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: process.env.DATABASE_HOST || "127.0.0.1",
      database: process.env.DATABASE_NAME || "meetdb",
      user: process.env.DATABASE_USER || "meetuser",
      password: process.env.DATABASE_PASSWORD || "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      database: process.env.DATABASE_NAME || "meetdb",
      tableName: "knex_migrations",
    },
  },
};
