import { IProduct } from "../products";

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
): Promise<IOrder> {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product,
      productQuantity,
      emailAddress,
    }),
  });

  if (!response.ok) throw new Error("Failed to update order.");
  return response.json();
}

export { createOrder };
export type { IOrder };
