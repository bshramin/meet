import express from "express";
var router = express.Router();
import { createOrder, createOrderItem } from "../repository/orders.ts";
import { getProductById, getProductsByIds } from "../repository/products.js";
import { calculateEthAmount, getLatestEthPrice } from "../web3/ethPrice.ts";

router.post("/", async function (req, res, next) {
  try {
    const { merchantId, items } = req.body;
    let totalAmountUsd = 0;

    if (items && items.length > 0) {
      const productIds = items.map((item) => item.productId);
      const products = await getProductsByIds(productIds);
      const productMap = Object.fromEntries(products.map((p) => [p.id, p]));
      for (const item of items) {
        item.product = productMap[item.productId];
        totalAmountUsd += item.product.price * item.quantity;
      }
    }
    const totalAmountEth = await calculateEthAmount(totalAmountUsd);
    const ethPrice = await getLatestEthPrice();

    const order = await createOrder(
      merchantId,
      totalAmountUsd,
      totalAmountEth,
      ethPrice
    );

    if (items && items.length > 0) {
      // Use Promise.all to handle all async operations in parallel
      await Promise.all(
        items.map(async (item) => {
          if (item.quantity <= 0) {
            return;
          }

          const orderItem = await createOrderItem(
            order.id,
            item.product.id,
            item.product.price,
            item.quantity
          );
          return orderItem;
        })
      );
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addItem", function (req, res, next) {
  createOrderItem(req.body)
    .then((order) => {
      res.json(order);
      return;
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    });
});

export default router;
