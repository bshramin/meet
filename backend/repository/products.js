import db from "./connection.js";

function getProductById(productId) {
return  db.one("SELECT * FROM products WHERE id = $1", [productId]);
}

export { getProductById };
