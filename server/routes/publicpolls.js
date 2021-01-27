const express = require("express")
const router = express.Router();
const publicPollsController = require("../controller/publicpolls");
const catchAsync = require("../utils/CatchAsync");

router.route("/").get(catchAsync(publicPollsController.showPolls))
module.exports = router;