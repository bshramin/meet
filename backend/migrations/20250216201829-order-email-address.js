"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("orders", "email_address", {
      type: Sequelize.STRING,
      allowNull: false, // Set to false if you want to require this field
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("orders", "email_address");
  },
};
