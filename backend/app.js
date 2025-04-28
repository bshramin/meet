import cors from "cors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import createError from "http-errors";

import indexRouter from "./routes/index.js";
import productsRouter from "./routes/products.js";
import merchantsRouter from "./routes/merchants.js";
import ordersRouter from "./routes/orders.js";
import paymentGuidesRouter from "./routes/paymentGuides.js";
import { handleOrderPaidEvent } from "./web3/orderPaidEvent.ts";
import { contract } from "./web3/contract.ts";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/merchants", merchantsRouter);
app.use("/orders", ordersRouter);
app.use("/payment-guides", paymentGuidesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Register Web3 event listeners
contract.watchEvent.OrderPaid({
  onLogs(events) {
    for (const event of events) {
      handleOrderPaidEvent(event);
    }
  },
});

export default app;
