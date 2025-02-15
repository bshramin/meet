import { Product } from "../models/index.ts";
import { Op } from "sequelize";

async function getProductById(productId) {
  return await Product.findByPk(productId);
}

async function getProductsByIds(productIds) {
  if (!productIds.length) {
    return [];
  }

  const products = await Product.findAll({
    where: {
      id: {
        [Op.in]: productIds,
      },
    },
  });
  return products.map((p) => {
    return p.toJSON();
  });
}

export { getProductById, getProductsByIds };
