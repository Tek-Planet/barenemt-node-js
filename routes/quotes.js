const express = require("express");
const router = express.Router();
const ordersOperations = require("../controllers/quotes");
// const fbAuth = require("../util/fbAuth");

router.get("/", ordersOperations.getQuotes);
router.post("/", ordersOperations.createQuote);
router.get("/:adId", ordersOperations.getQuote);

module.exports = router;
