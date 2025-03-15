import { NextResponse } from "next/server";
import type { IMerchant } from ".."; // Import IMerchant

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:3001";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ merchantId?: string }> }
) {
  const { merchantId } = await params;

  if (!merchantId) {
    return NextResponse.json({ error: "Missing merchantId" }, { status: 400 });
  }

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/merchants/${merchantId}`);

    if (!response.ok) {
      console.error("Failed to fetch merchant:", response.statusText);
      return NextResponse.json(
        { error: "Failed to fetch merchant" },
        { status: response.status }
      );
    }

    const result: IMerchant = await response.json();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching merchant:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
