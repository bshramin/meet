interface IMerchant {
  id: string;
  merchantId: string;
  wallet: string;
  percentage: number;
}

async function getMerchant(merchantID: string) {
  const BACKEND_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:3001";

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/merchants/${merchantID}`);
    if (!response.ok) {
      console.error("Failed to fetch merchant with response:", response);
      throw new Error("Failed to fetch merchant. Please try again.");
    }
    const result = await response.json();
    console.log("Merchant data received:", result);
    return result;
  } catch (err) {
    console.error("Failed to fetch merchant error:", err);
    throw "Failed to fetch merchant. Please try again.";
  }
}

export { getMerchant };
export type { IMerchant };
