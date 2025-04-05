import express from "express";
var router = express.Router();
import {
  getProductById,
  getProductByIdPrefix,
} from "../repository/products.js";

router.get(
  "/:productId",
  function (req: express.Request, res: express.Response) {
    const productId = req.params.productId;
    const productPromise = productId.includes("-")
      ? getProductById(productId)
      : getProductByIdPrefix(productId);

    productPromise
      .then((product) => {
        res.json(product);
        return;
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      });
  }
);

export default router;
