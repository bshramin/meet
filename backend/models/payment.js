"use strict";
const { Model } = require("sequelize");
export default (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init(
    {
      contract_address: DataTypes.STRING,
      block_number: DataTypes.BIGINT,
      transaction_hash: DataTypes.STRING,
      transaction_index: DataTypes.INTEGER,
      block_hash: DataTypes.STRING,
      log_index: DataTypes.INTEGER,
      payer: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      order_id: DataTypes.STRING,
      recipient: DataTypes.STRING,
      recipient_amount: DataTypes.DECIMAL,
      owner: DataTypes.STRING,
      owner_amount: DataTypes.DECIMAL,
      merchant_percentage: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "payment",
    }
  );
  return Payment;
};
