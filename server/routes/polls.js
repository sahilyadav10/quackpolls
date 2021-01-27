const express = require("express");
const router = express.Router();
const pollController = require("../controller/polls");
const catchAsync = require("../utils/CatchAsync")

router.route("/new").post(catchAsync(pollController.createPoll));

router
  .route("/:id")
  .get(catchAsync(pollController.showPoll))
  .post(catchAsync(pollController.voteOnPoll));

module.exports = router;
