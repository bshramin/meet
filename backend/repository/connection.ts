import { Options, Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const db = new Sequelize({
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT || 5432,
  database: process.env.DATABASE_NAME || "meetdb",
  username: process.env.DATABASE_USER || "meetuser",
  password: process.env.DATABASE_PASSWORD || "password",
  dialect: "postgres" as Dialect,
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "development"
        ? false
        : {
            rejectUnauthorized: false,
          },
  },
  define: {
    underscored: true, // This automatically handles snake_case ↔ camelCase conversion
    timestamps: true,
  },
} as Options);

export default db;
