import db from "./connection.js";

function getMerchantById(merchantId) {
  return db.one("SELECT * FROM merchants WHERE id = $1", [merchantId]);
}

export { getMerchantById };
