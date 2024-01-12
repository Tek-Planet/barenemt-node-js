const express = require("express");
const router = express.Router();
const adsOperations = require("../controllers/companyfavourites");
// const fbAuth = require("../util/fbAuth");

router.get("/", adsOperations.getCompanyfavourites);

router.post("/", adsOperations.createCompanyfavourites);

router.delete("/:Id", adsOperations.deleteCompanyfavourites);

module.exports = router;
