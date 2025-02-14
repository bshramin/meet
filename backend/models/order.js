"use strict";
const { Model } = require("sequelize");
export default (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with OrderItem model
      Order.hasMany(models.OrderItem, {
        foreignKey: "order_id",
        as: "orderItems",
      });
    }
  }
  Order.init(
    {
      id: DataTypes.UUID,
      merchant_id: DataTypes.UUID,
      status: DataTypes.STRING,
      total_amount_usd: DataTypes.DECIMAL,
      total_amount_eth: DataTypes.DECIMAL,
      eth_price: DataTypes.DECIMAL,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
    }
  );
  return Order;
};
