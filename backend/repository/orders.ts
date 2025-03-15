import { Order, OrderItem } from "../models/index.ts";

async function createOrder(
  merchantId: string,
  emailAddress: string,
  totalAmountUsd: number,
  totalAmountEth: number,
  ethPrice: number
) {
  try {
    console.log("Creating order for email:", emailAddress);
    const order = await Order.create({
      status: "pending",
      emailAddress: emailAddress,
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

async function getOrderByOrderId(orderId: string) {
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

async function createOrderItem(
  orderId: string,
  productId: string,
  productPrice: number,
  quantity: number
) {
  return await OrderItem.create({
    orderId: orderId,
    productId: productId,
    unitPrice: productPrice,
    quantity: quantity,
  });
}

async function updateOrderStatus(orderId: string, status: string) {
  try {
    return await Order.update({ status: status }, { where: { id: orderId } });
  } catch (error) {
    console.error("Error updating Order status:", error);
    throw error;
  }
}

export { createOrder, createOrderItem, updateOrderStatus, getOrderByOrderId };
