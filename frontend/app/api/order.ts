import { IProduct } from "./products";

interface IOrder {
  id: string;
  merchantId: string;
  totalAmount: number;
  totalAmountEth: number;
  status: string;
}

async function createOrder(
  product: IProduct,
  productQuantity: number,
  emailAddress: string
) {
  console.log("Creating order for email:", emailAddress);
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
        merchantId: product.merchantId,
        emailAddress,
        items: [
          {
            productId: product.id,
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
