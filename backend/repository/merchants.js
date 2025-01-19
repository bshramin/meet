const db = require("./connection");

function getMerchantById(merchantId) {
  return db.one("SELECT * FROM merchants WHERE id = $1", [merchantId]);
}

module.exports = { getMerchantById };
