import { NextResponse } from "next/server";

// This is a mock implementation. In a real application, you would fetch this from a database
const paymentGuides = {
  US: {
    title: "How to Pay with MetaMask in the United States",
    steps: [
      "Install MetaMask extension from the Chrome Web Store",
      "Create a new wallet or import an existing one",
      "Add funds to your wallet using a credit card or bank transfer",
      "Connect your MetaMask wallet to this website",
      "Complete the payment process",
    ],
  },
  UK: {
    title: "How to Pay with MetaMask in the United Kingdom",
    steps: [
      "Install MetaMask extension from the Chrome Web Store",
      "Create a new wallet or import an existing one",
      "Add funds to your wallet using a credit card or bank transfer",
      "Connect your MetaMask wallet to this website",
      "Complete the payment process",
    ],
  },
  default: {
    title: "How to Pay with MetaMask",
    steps: [
      "Install MetaMask extension from the Chrome Web Store",
      "Create a new wallet or import an existing one",
      "Add funds to your wallet using a credit card or bank transfer",
      "Connect your MetaMask wallet to this website",
      "Complete the payment process",
    ],
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country") || "default";

  const guide =
    paymentGuides[country as keyof typeof paymentGuides] ||
    paymentGuides.default;

  return NextResponse.json(guide);
}
