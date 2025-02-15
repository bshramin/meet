import { Order, OrderItem } from "../models/index.js";

async function createOrder(
  merchantId,
  totalAmountUsd,
  totalAmountEth,
  ethPrice
) {
  return await Order.create({
    merchant_id: merchantId,
    total_amount_usd: totalAmountUsd,
    total_amount_eth: totalAmountEth,
    eth_price: ethPrice,
  });
}

async function createOrderItem(orderId, productId, productPrice, quantity) {
  return await OrderItem.create({
    order_id: orderId,
    product_id: productId,
    unit_price: productPrice,
    quantity: quantity,
  });
}

export { createOrder, createOrderItem };
