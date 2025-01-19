/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // Create the products table
  await knex.schema.createTable("products", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()")); // UUID primary key
    table.string("name").notNullable(); // Product name
    table.decimal("price", 10, 2).notNullable(); // Product price
    table.uuid("merchant_id").notNullable(); // Foreign key to merchants table (now UUID)
    table
      .foreign("merchant_id")
      .references("id")
      .inTable("merchants")
      .onDelete("CASCADE"); // Set foreign key
    table.timestamps(true, true); // Created at and Updated at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Drop the products table first as it depends on the merchants table
  await knex.schema.dropTableIfExists("products");
};
