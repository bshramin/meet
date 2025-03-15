import { NextResponse } from "next/server";
import type { IProduct } from "..";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:3001";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const { productId } = await params;

  if (!productId) {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/products/${productId}`);

    if (!response.ok) {
      console.error("Failed to fetch product:", response.statusText);
      return NextResponse.json(
        { error: "Failed to fetch product" },
        { status: response.status }
      );
    }

    const result: IProduct = await response.json();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
