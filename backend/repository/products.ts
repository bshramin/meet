import { Product } from "../models/index.ts";
import { Op, Sequelize } from "sequelize";
import db from "../models/index.ts";

async function getProductById(productId: string) {
  return await Product.findByPk(productId);
}

async function getProductsByIds(productIds: string[]) {
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

async function getProductByIdPrefix(idPrefix: string) {
  if (!idPrefix) {
    throw new Error("ID prefix must not be empty");
  }

  const products = await Product.findAll({
    where: (db.sequelize as Sequelize).where(
      (db.sequelize as Sequelize).cast(
        (db.sequelize as Sequelize).col("id"),
        "text"
      ),
      Op.like,
      `${idPrefix}-%`
    ),
    limit: 1,
    attributes: {
      include: [
        [
          (db.sequelize as Sequelize).cast(
            (db.sequelize as Sequelize).col("id"),
            "text"
          ),
          "id",
        ],
      ],
    },
    raw: true,
  });

  return products.length ? products[0] : null;
}

export { getProductById, getProductsByIds, getProductByIdPrefix };
