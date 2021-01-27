const express = require("express");
const router = express.Router();
const resultsController = require("../controller/results");
const catchAsync = require("../utils/CatchAsync");

router.route("/:id").get(catchAsync(resultsController.showResults));

module.exports = router;
