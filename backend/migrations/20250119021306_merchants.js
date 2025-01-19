/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // Create the merchants table
  await knex.schema.createTable("merchants", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()")); // UUID primary key
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
