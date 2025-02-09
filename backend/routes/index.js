import express from "express";
var router = express.Router();
import { getMerchantById } from "../repository/merchants.js";

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express server is up!" });
});

export default router;
