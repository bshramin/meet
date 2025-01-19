var express = require("express");
var router = express.Router();
const { getProductById } = require("../repository/products");

router.get("/:productId", function (req, res, next) {
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
});

module.exports = router;
