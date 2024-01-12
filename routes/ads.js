const express = require("express");
const router = express.Router();
const adsOperations = require("../controllers/ads");
// const fbAuth = require("../util/fbAuth");

router.get("/", adsOperations.getAds);
router.get("/open", adsOperations.getOpenAds);
router.post("/", adsOperations.createAds);
router.put("/", adsOperations.updateAds);
router.delete("/:Id", adsOperations.deleteAds);

module.exports = router;
