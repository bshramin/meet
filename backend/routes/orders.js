import express from "express";
var router = express.Router();
import { createOrder, createOrderItem } from "../repository/orders.js";
import { getProductById } from "../repository/products.js";
import { calculateEthAmount } from "../web3/ethPrice.ts";

router.post("/", async function (req, res, next) {
  try {
    const { items } = req.body;
    const order = await createOrder(req.body);

    let totalAmount = 0;

    if (items && items.length > 0) {
      // Use Promise.all to handle all async operations in parallel
      const orderItems = await Promise.all(
        items.map(async (item) => {
          if (item.quantity <= 0) {
            return;
          }
          const product = await getProductById(item.product_id); // TODO: can get all these in one tx

          const orderItem = await createOrderItem(
            order.id,
            product.id,
            product.price,
            item.quantity
          );
          totalAmount += product.price * item.quantity;
          return orderItem;
        })
      );
    }

    order.totalAmount = totalAmount;
    order.totalAmountEth = await calculateEthAmount(order.totalAmount); // todo: store this value and current eth price on database
    console.log(
      "totalAmount: ",
      order.totalAmount,
      "totalAmountEth: ",
      order.totalAmountEth
    );
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
