const pgp = require("pg-promise")(/* options */);
require("dotenv").config(); // Load environment variables from .env file

const db = pgp({
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT || 5432,
  database: process.env.DATABASE_NAME || "meetdb",
  user: process.env.DATABASE_USER || "meetuser",
  password: process.env.DATABASE_PASSWORD || "password",
  ssl:
    process.env.NODE_ENV === "development"
      ? false
      : {
          rejectUnauthorized: false,
        },
});

module.exports = db;
