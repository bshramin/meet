"use strict";
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contract_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      block_number: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      transaction_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transaction_index: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      block_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      log_index: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(65, 0),
        allowNull: false,
      },
      order_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      recipient: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      recipient_amount: {
        type: Sequelize.DECIMAL(65, 0),
        allowNull: false,
      },
      owner: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      owner_amount: {
        type: Sequelize.DECIMAL(65, 0),
        allowNull: false,
      },
      merchant_percentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("payments");
  },
};
