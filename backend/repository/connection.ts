import { Options, Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const db = new Sequelize({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "meetdb",
  username: process.env.DB_USER || "meetuser",
  password: process.env.DB_PASSWORD || "password",
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
