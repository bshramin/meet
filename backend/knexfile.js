import dotenv from "dotenv";
dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DATABASE_HOST || "127.0.0.1",
      database: process.env.DATABASE_NAME || "meetdb",
      user: process.env.DATABASE_USER || "meetuser",
      password: process.env.DATABASE_PASSWORD || "password",
      ssl:
        process.env.NODE_ENV === "development"
          ? false
          : {
              require: true,
              rejectUnauthorized: false,
            },
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
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
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
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
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
