/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // Create the orders table
  await knex.schema.createTable("orders", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()")); // UUID primary key
    table.uuid("merchant_id").notNullable(); // Foreign key to merchants
    table.decimal("total_amount", 10, 2).notNullable(); // Total order amount
    table.string("status").notNullable().defaultTo("pending"); // Order status
    table.timestamps(true, true); // Created at and Updated at

    table
      .foreign("merchant_id")
      .references("id")
      .inTable("merchants")
      .onDelete("CASCADE");
  });

  // Create the order_items table for the many-to-many relationship
  await knex.schema.createTable("order_items", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()")); // UUID primary key
    table.uuid("order_id").notNullable(); // Foreign key to orders
    table.uuid("product_id").notNullable(); // Foreign key to products
    table.integer("quantity").notNullable(); // Quantity of the product
    table.decimal("unit_price", 10, 2).notNullable(); // Price at time of order
    table.timestamps(true, true); // Created at and Updated at

    table
      .foreign("order_id")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");
    table
      .foreign("product_id")
      .references("id")
      .inTable("products")
      .onDelete("RESTRICT");

    // Create an index on order_id to improve query performance
    table.index("order_id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Drop tables in reverse order
  await knex.schema.dropTableIfExists("order_items");
  await knex.schema.dropTableIfExists("orders");
};
