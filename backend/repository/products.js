import db from "./connection.js";

function getProductById(productId) {
  return db.one("SELECT * FROM products WHERE id = $1", [productId]);
}

// Function to get multiple products by IDs in a single query
async function getProductsByIds(productIds) {
  if (!productIds.length) {
    return [];
  }

  // Create parameterized query with the correct number of parameters
  const params = productIds.map((_, index) => `$${index + 1}`).join(",");
  const query = `SELECT * FROM products WHERE id IN (${params})`;

  // Execute the query with all product IDs as parameters
  return db.any(query, productIds);
}

export { getProductById, getProductsByIds };
