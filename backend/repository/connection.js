import camelCase from 'camelcase';
import snakeCasePKG  from 'snakecase-keys';
const { snakeCase } = snakeCasePKG;
import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

const pgp = pgPromise({
  receive: (data) => {
    Object.assign(data.data, deepTransformKeys(data.data, camelCase));
  },
  query: (e) => {
    console.log("Query hook triggered", e.params)
    // Convert camelCase → snake_case on write
    if (e.params) {
      e.params = deepTransformKeys(e.params, snakeCase);
    }
  }
});

// Deep key transformation helper
const deepTransformKeys = (obj, transformFn) => {
  if (Array.isArray(obj)) {
    return obj.map(item => deepTransformKeys(item, transformFn));
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = transformFn(key);
      acc[newKey] = deepTransformKeys(obj[key], transformFn);
      return acc;
    }, {});
  }
  return obj;
};


dotenv.config(); // Load environment variables from .env file

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

export default db;
