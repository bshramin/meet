/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Clear existing data
  await knex("products").del();
  await knex("merchants").del();

  // Insert a merchant and store the returning UUID
  const [merchant] = await knex("merchants")
    .insert([
      {
        name: "Sample Store",
        email: "store@example.com",
      },
    ])
    .returning("id");

  // Insert a product for the merchant using the returned UUID
  await knex("products").insert([
    {
      name: "Sample Product",
      price: 99.99,
      merchant_id: merchant.id,
    },
  ]);
};
