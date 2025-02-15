import { Product } from "../models/index.js";
import { Op } from "sequelize";

async function getProductById(productId) {
  return await Product.findByPk(productId);
}

async function getProductsByIds(productIds) {
  if (!productIds.length) {
    return [];
  }

  return await Product.findAll({
    where: {
      id: {
        [Op.in]: productIds,
      },
    },
  });
}

export { getProductById, getProductsByIds };
