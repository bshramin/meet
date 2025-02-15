"use strict";
import { Model } from "sequelize";
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
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      merchant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_amount_usd: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      total_amount_eth: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      eth_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
    }
  );
  return Order;
};
