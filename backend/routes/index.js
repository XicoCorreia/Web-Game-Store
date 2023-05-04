const asyncHandler = require("express-async-handler");
const express = require("express");
const init = require("../controllers/initController");

const router = express.Router();

router.get("/init", asyncHandler(init.initDatabase));

module.exports = router;
