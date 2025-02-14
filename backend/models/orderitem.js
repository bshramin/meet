"use strict";
const { Model } = require("sequelize");
export default (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Order model
      OrderItem.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });
    }
  }
  OrderItem.init(
    {
      id: DataTypes.UUID,
      order_id: DataTypes.UUID,
      product_id: DataTypes.UUID,
      quantity: DataTypes.INTEGER,
      unit_price: DataTypes.DECIMAL,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "OrderItem",
      tableName: "order_items",
    }
  );
  return OrderItem;
};
