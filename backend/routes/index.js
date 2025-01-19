var express = require("express");
var router = express.Router();
const { getMerchantById } = require("../repository/merchants");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express server is up!" });
});

module.exports = router;
