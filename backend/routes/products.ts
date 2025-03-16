import express from "express";
var router = express.Router();
import { getProductById } from "../repository/products.js";

router.get(
  "/:productId",
  function (req: express.Request, res: express.Response) {
    const productId = req.params.productId;

    getProductById(productId)
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
