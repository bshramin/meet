import { IProduct } from "./product";

interface IOrder {
  id: string;
  merchantId: string;
  totalAmount: number;
  totalAmountEth: number;
  status: string;
}

async function createOrder(product: IProduct, productQuantity: number) {
  let order;
  const BACKEND_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:3001";
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant_id: product.merchantId,
        items: [
          {
            product_id: product.id,
            quantity: productQuantity,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Order creation failed");
    }

    order = await response.json();
  } catch (err) {
    console.error("Failed to create order:", err);
    throw new Error("Failed to create order. Please try again.");
  } finally {
    // You can add any cleanup or finalization logic here if needed
  }

  return order;
}

export { createOrder };
export type { IOrder };
