import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country") || "default";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/payment-guides/${country}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch payment guide");
    }

    const guide = await response.json();
    return NextResponse.json(guide);
  } catch (error) {
    console.error("Error fetching payment guide:", error);
    // Return a default guide if the API call fails
    return NextResponse.json({
      title: "How to Pay with MetaMask",
      steps: [
        "Install MetaMask extension from the Chrome Web Store",
        "Create a new wallet or import an existing one",
        "Add funds to your wallet using a credit card or bank transfer",
        "Connect your MetaMask wallet to this website",
        "Complete the payment process",
      ],
    });
  }
}
