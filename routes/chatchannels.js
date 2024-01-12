const express = require("express");
const router = express.Router();
const chatchannelsOperations = require("../controllers/chatchannels");
// const fbAuth = require("../util/fbAuth");

router.get("/", chatchannelsOperations.getChatChannels);
router.get("/:Id", chatchannelsOperations.getChats);
router.get("/inbox/:userId", chatchannelsOperations.getChatChannel);
router.post("/", chatchannelsOperations.createChat);

module.exports = router;
