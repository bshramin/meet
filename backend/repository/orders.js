import db from "./connection.js";

function createOrder(merchantId, totalAmountUsd, totalAmountEth, ethPrice) {
  return db.one(
    `INSERT INTO orders (merchant_id, total_amount_usd,total_amount_eth, eth_price)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [merchantId, totalAmountUsd, totalAmountEth, ethPrice]
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

export { createOrder, createOrderItem };
