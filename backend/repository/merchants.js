import { Merchant } from "../models/index.ts";

async function getMerchantById(merchantId) {
  return await Merchant.findByPk(merchantId);
}

export { getMerchantById };
