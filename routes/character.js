const router = require("express").Router();

/* GET home page */
router.get("/character", (req, res, next) => {
  res.render("index");
});

module.exports = router;
