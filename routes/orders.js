const express = require("express");
const router = express.Router();
const ordersOperations = require("../controllers/orders");
// const fbAuth = require("../util/fbAuth");

router.get("/", ordersOperations.getOrders);
router.post("/", ordersOperations.createOrder);
router.put("/", ordersOperations.updateOrder);
router.post("/ratings", ordersOperations.createOrderRating);
module.exports = router;
