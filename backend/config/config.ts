import dotenv from "dotenv";
import type { Dialect } from "sequelize";

dotenv.config();

type IConfigEnvironment = {
  username: string;
  password?: string;
  database: string;
  host: string;
  dialect: Dialect;
  port?: number;
  logging: boolean;
  use_env_variable?: string;
};

type IConfig = {
  development: IConfigEnvironment;
  test: IConfigEnvironment;
  production: IConfigEnvironment;
};

const config = {
  development: {
    username: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || null,
    database: process.env.DATABASE_NAME || "database_development",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    dialect: process.env.DATABASE_DIALECT || "postgres",
    port: process.env.DATABASE_PORT || 5432,
    logging: false,
  },
  test: {
    username: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || null,
    database: process.env.DATABASE_NAME || "database_test",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    dialect: process.env.DATABASE_DIALECT || "postgres",
    port: process.env.DATABASE_PORT || 5432,
    logging: false,
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT || "postgres",
    port: process.env.DATABASE_PORT || 5432,
    logging: false,
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
  },
};

export default config as IConfig;
export type { IConfig };
