/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  // Create the merchants table
  await knex.schema.createTable("merchants", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()")); // UUID primary key
    table.string("name").notNullable(); // Merchant name
    table.string("wallet").notNullable(); // Merchant wallet address
    table.integer("percentage").notNullable(); // Merchant percentage (90% would be stored as 9000)
    table.string("email").notNullable().unique(); // Unique email
    table.timestamps(true, true); // Created at and Updated at
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  // Drop the merchants table
  await knex.schema.dropTableIfExists("merchants");
}
