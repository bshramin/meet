import express from"express";
var router = express.Router();
import { getMerchantById } from "../repository/merchants.js";

router.get("/:merchantId", function (req, res, next) {
  const merchantId = req.params.merchantId;
  getMerchantById(merchantId)
    .then((merchant) => {
      res.json(merchant);
      return;
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    });
});

export default router;
