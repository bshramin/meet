"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // Clear existing data
    await queryInterface.bulkDelete("order_items", null, {});
    await queryInterface.bulkDelete("orders", null, {});
    await queryInterface.bulkDelete("products", null, {});
    await queryInterface.bulkDelete("merchants", null, {});

    // Constants
    const productOrderQuantity = 3;
    const ethPrice = 3000;

    // Insert merchant
    const merchant = await queryInterface.bulkInsert(
      "merchants",
      [
        {
          id: "bda172b3-8dc2-4e2b-ab64-4f51c8d24427",
          name: "Amin",
          email: "amin.bashiri28@gmail.com",
          wallet: "0xEbC23e7035f70E91a35e7AB33E8337E3D3B69a6E",
          percentage: 9000,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    // Insert product
    const product = await queryInterface.bulkInsert(
      "products",
      [
        {
          id: "48b406f2-6437-4248-a246-6b957e16b15b",
          name: "One-hour session with Amin",
          price: 2,
          description:
            "This one-hour therapy session with Amin provides a personalized approach to mental wellness, including cognitive restructuring, mindfulness techniques, and optional guided exercises tailored to individual needs. The session is ideal for those dealing with stress, anxiety, or personal growth challenges. Whether you're looking for coping strategies, emotional support, or a structured therapeutic plan, Dylan ensures a safe and supportive environment to help you navigate your journey.",
          merchant_id: "bda172b3-8dc2-4e2b-ab64-4f51c8d24427",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    // Insert order
    const order = await queryInterface.bulkInsert("orders", [], {
      returning: true,
    });

    // Insert order items
    await queryInterface.bulkInsert("order_items", []);
  },

  async down(queryInterface, Sequelize) {
    // Revert seed by deleting all data in reverse order
    await queryInterface.bulkDelete("order_items", null, {});
    await queryInterface.bulkDelete("orders", null, {});
    await queryInterface.bulkDelete("products", null, {});
    await queryInterface.bulkDelete("merchants", null, {});
  },
};
