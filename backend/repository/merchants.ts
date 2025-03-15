import { Merchant } from "../models/index.ts";

async function getMerchantById(merchantId: string) {
  try {
    const merchant = await Merchant.findByPk(merchantId);
    if (!merchant) {
      throw new Error(`Merchant with id ${merchantId} not found`);
    }
    return merchant.toJSON();
  } catch (error) {
    console.error("Error getting Merchant by ID:", error);
    throw error;
  }
}

export { getMerchantById };
