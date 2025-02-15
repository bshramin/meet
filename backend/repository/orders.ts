import { Order, OrderItem } from "../models/index.ts";

async function createOrder(
  merchantId,
  totalAmountUsd,
  totalAmountEth,
  ethPrice
) {
  try {
    const order = await Order.create({
      status: "pending",
      merchantId: merchantId,
      totalAmountUsd: totalAmountUsd,
      totalAmountEth: totalAmountEth,
      ethPrice: ethPrice,
    });
    return order.toJSON();
  } catch (error) {
    console.error("Error creating Order record:", error);
    throw error;
  }
}

async function getOrderByOrderId(orderId) {
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }
    return order.toJSON();
  } catch (error) {
    console.error("Error getting Order by ID:", error);
    throw error;
  }
}

async function createOrderItem(orderId, productId, productPrice, quantity) {
  return await OrderItem.create({
    orderId: orderId,
    productId: productId,
    unitPrice: productPrice,
    quantity: quantity,
  });
}

async function updateOrderStatus(orderId, status) {
  try {
    return await Order.update({ status: status }, { where: { id: orderId } });
  } catch (error) {
    console.error("Error updating Order status:", error);
    throw error;
  }
}

export { createOrder, createOrderItem, updateOrderStatus, getOrderByOrderId };
