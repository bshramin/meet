"use strict";

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import process from "process";
import conf from "../config/config.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const db = {};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = conf[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Read and filter files synchronously
const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
  );

for (const file of files) {
  const filePath = path.join(__dirname, file);
  const module = await import(filePath);
  // Assuming the module exports a default function that accepts (sequelize, Sequelize.DataTypes)
  const model = module.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Now that all models are loaded, run associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export const Product = db.Product;
export const Merchant = db.Merchant;
export const Order = db.Order;
export const OrderItem = db.OrderItem;

export default db;
