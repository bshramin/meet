import express from "express";
var router = express.Router();

router.get("/", function (req: express.Request, res: express.Response) {
  res.render("index", { title: "Express server is up!" });
});

export default router;
