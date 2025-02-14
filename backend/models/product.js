"use strict";
const { Model } = require("sequelize");
export default (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      id: DataTypes.UUID,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL,
      merchant_id: DataTypes.UUID,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
    }
  );
  return Product;
};
