import { Merchant } from "../models/index.js";

async function getMerchantById(merchantId) {
  return await Merchant.findByPk(merchantId);
}

export { getMerchantById };
