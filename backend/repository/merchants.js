import { Merchant } from "../models/index.js"; // Adjust the path as needed

async function getMerchantById(merchantId) {
  return await Merchant.findByPk(merchantId);
}

export { getMerchantById };
