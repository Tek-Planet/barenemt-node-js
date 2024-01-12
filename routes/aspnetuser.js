const express = require("express");
const router = express.Router();
const userOperations = require("../controllers/aspnetusers");
// const fbAuth = require("../util/fbAuth");

router.get("/", userOperations.getLoggedInUser);
router.get("/users", userOperations.getAllUsers);
router.get("/:Id", userOperations.getUser);
router.put("/", userOperations.updateUser);
router.get("/categories/:categoryId", userOperations.getUserByCategory);

module.exports = router;
