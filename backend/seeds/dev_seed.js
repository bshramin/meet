/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Clear existing data
  await knex("order_items").del();
  await knex("orders").del();
  await knex("products").del();
  await knex("merchants").del();

  // Insert a merchant and store the returning UUID
  const [merchant] = await knex("merchants")
    .insert([
      {
        id: "bda172b3-8dc2-4e2b-ab64-4f51c8d24427",
        name: "Dylan",
        email: "dylan@example.com",
      },
    ])
    .returning("id");

  // Insert a product
  const [product] = await knex("products")
    .insert([
      {
        id: "48b406f2-6437-4248-a246-6b957e16b15b",
        name: "One-hour session with Dylan",
        price: 25,
        description:
          "This one-hour therapy session with Dylan provides a personalized approach to mental wellness, including cognitive restructuring, mindfulness techniques, and optional guided exercises tailored to individual needs. The session is ideal for those dealing with stress, anxiety, or personal growth challenges. Whether you're looking for coping strategies, emotional support, or a structured therapeutic plan, Dylan ensures a safe and supportive environment to help you navigate your journey.",
        merchant_id: merchant.id,
      },
    ])
    .returning("*");

  // Create a sample order
  const [order] = await knex("orders")
    .insert([
      {
        id: "7d4c90e7-af3b-4348-8c3d-c4965b42b28f",
        merchant_id: merchant.id,
        status: "pending",
      },
    ])
    .returning("*");

  // Create order items
  await knex("order_items").insert([
    {
      id: "9e3c2fdd-6b9c-4c38-8c5a-4f51c8d24427",
      order_id: order.id,
      product_id: product.id,
      quantity: 3,
      unit_price: product.price, // Store the price at time of order
    },
  ]);
};
