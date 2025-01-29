const pgp = require("pg-promise")(/* options */);

const db = pgp({
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT || 5432,
  database: process.env.DATABASE_NAME || "meetdb",
  user: process.env.DATABASE_USER || "meetuser",
  password: process.env.DATABASE_PASSWORD || "password",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = db;
