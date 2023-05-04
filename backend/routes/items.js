const asyncHandler = require("express-async-handler");
const express = require("express");
const item = require("../controllers/itemController");

const router = express.Router();

/* GET */
router.get("/", asyncHandler(item.getItems));
router.get("/:id", asyncHandler(item.getItem));
/* PUT */
router.put("/:id", asyncHandler(item.updateItem));

module.exports = router;
