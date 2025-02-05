const db = require("./connection");

function createOrder(orderData) {
  const { merchant_id } = orderData;

  return db.one(
    `INSERT INTO orders (merchant_id)
     VALUES ($1)
     RETURNING *`,
    [merchant_id]
  );
}

function createOrderItem(order_id, product_id, product_price, quantity) {
  return db.one(
    `INSERT INTO order_items (order_id, product_id, unit_price, quantity)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [order_id, product_id, product_price, quantity]
  );
}

module.exports = { createOrder, createOrderItem };
