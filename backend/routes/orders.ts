import express from "express";
var router = express.Router();
import { createOrder, createOrderItem } from "../repository/orders.ts";
import { getProductById, getProductsByIds } from "../repository/products.js";
import { calculateEthAmount, getLatestEthPrice } from "../web3/ethPrice.ts";

interface OrderItem {
  productId: string;
  quantity: number;
  product?: {
    id: string;
    price: number;
  };
}

router.post("/", async function (req, res, next) {
  try {
    const { merchantId, items, emailAddress } = req.body; // TODO: add validation on input
    let totalAmountUsd = 0;
    console.log("body", req.body);
    if (items && items.length > 0) {
      const productIds = items.map((item: OrderItem) => item.productId);
      const products = await getProductsByIds(productIds);
      const productMap = Object.fromEntries(products.map((p) => [p.id, p]));
      for (const item of items as OrderItem[]) {
        item.product = productMap[item.productId];
        if (!item.product) {
          res.status(400).json({ error: "Product doesn't exist" });
          return;
        }
        totalAmountUsd += item.product.price * item.quantity;
      }
    }
    const totalAmountEth = await calculateEthAmount(totalAmountUsd);
    const ethPrice = await getLatestEthPrice();

    const order = await createOrder(
      merchantId,
      emailAddress,
      totalAmountUsd,
      totalAmountEth,
      ethPrice
    );

    if (items && items.length > 0) {
      // Use Promise.all to handle all async operations in parallel
      await Promise.all(
        items.map(async (item: OrderItem) => {
          if (item.quantity <= 0) {
            res.status(400).json({ error: "Invalid quantity for item" });
            return;
          }
          if (!item.product) {
            res.status(400).json({ error: "Product doesn't exist" });
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

interface AddItemRequestBody {
  orderId: string;
  productId: string;
  price: number;
  quantity: number;
}

router.post(
  "/addItem",
  function (
    req: express.Request<{}, {}, AddItemRequestBody>,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { orderId, productId, price, quantity } = req.body; // TODO: Get the price from the database not request
    createOrderItem(orderId, productId, price, quantity)
      .then((order) => {
        res.json(order);
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
