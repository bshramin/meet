/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // Create the merchants table
  await knex.schema.createTable("merchants", (table) => {
    table.increments("id").primary(); // Primary key
    table.string("name").notNullable(); // Merchant name
    table.string("email").notNullable().unique(); // Unique email
    table.timestamps(true, true); // Created at and Updated at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Drop the merchants table
  await knex.schema.dropTableIfExists("merchants");
};
