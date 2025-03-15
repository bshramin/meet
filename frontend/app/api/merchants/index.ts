interface IMerchant {
  id: string;
  merchantId: string;
  wallet: string;
  percentage: number;
}

async function getMerchant(merchantID: string): Promise<IMerchant> {
  const response = await fetch(`/api/merchants/${merchantID}`);
  if (!response.ok) throw new Error("Failed to fetch merchant.");
  return response.json();
}

export { getMerchant };
export type { IMerchant };
