import fs from "fs";
import path from "path";
import { Sequelize, DataTypes, Model } from "sequelize";
import type { ModelStatic } from "sequelize";
import process from "process";
import conf from "../config/config.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { IConfig } from "../config/config.ts";

interface DbInterface {
  [key: string]: ModelStatic<Model> | Sequelize | typeof Sequelize;
}

const db: DbInterface = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = conf[env as keyof IConfig];

let sequelize: Sequelize;
if (config.use_env_variable) {
  const connectionString = process.env[config.use_env_variable];
  if (!connectionString) {
    throw new Error(
      `Environment variable ${config.use_env_variable} is not defined`
    );
  }
  sequelize = new Sequelize(connectionString, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

type ModelInitializer = (
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
) => ModelStatic<Model>;

// Read all files in the directory and filter for model files
const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".ts" &&
      file.indexOf(".test.ts") === -1
  );

// Dynamically import and initialize each model
for (const file of files) {
  const filePath = path.join(__dirname, file);
  const importedModule = await import(filePath);
  const modelInitializer = importedModule.default as ModelInitializer;
  const model = modelInitializer(sequelize, DataTypes);
  console.log("Added model to database:", model.name);
  db[model.name] = model;
}

// Run associations if defined
Object.keys(db).forEach((modelName) => {
  const model = db[modelName] as ModelStatic<Model> & {
    associate?: (db: DbInterface) => void;
  };
  if (model && typeof model.associate === "function") {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export individual models as needed
export const Product = db.Product as ModelStatic<Model>;
export const Payment = db.Payment as ModelStatic<Model>;
export const Merchant = db.Merchant as ModelStatic<Model>;
export const Order = db.Order as ModelStatic<Model>;
export const OrderItem = db.OrderItem as ModelStatic<Model>;

export default db;
