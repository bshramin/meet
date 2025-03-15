import { NextResponse } from "next/server";

interface IProduct {
  id: string;
  merchantId: string;
}

interface IOrder {
  id: string;
  merchantId: string;
  totalAmount: number;
  totalAmountEth: number;
  status: string;
}

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:3001";

export async function POST(request: Request) {
  const { product, productQuantity, emailAddress } = await request.json();

  if (!product || !productQuantity || !emailAddress) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  console.log("Updating order for email:", emailAddress);

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchantId: product.merchantId,
        emailAddress,
        items: [{ productId: product.id, quantity: productQuantity }],
      }),
    });

    if (!response.ok) {
      console.error("Order update failed:", response.statusText);
      return NextResponse.json(
        { error: "Order update failed" },
        { status: response.status }
      );
    }

    const order: IOrder = await response.json();
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
