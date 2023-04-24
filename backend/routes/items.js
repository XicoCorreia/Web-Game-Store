var express = require("express");
var router = express.Router();

const { Item } = require("../db/models/item");

/**
 * GET items listing (with optional titlesearch query).
 */
router.get("/", async function (req, res, next) {
  const query = req.query.title
    ? { title: { $regex: req.query.title, $options: "i" } }
    : {};
  const items = await Item.find(query).sort({ title: 1 }).select("-_id -__v");
  return res.status(200).json(items);
});

//GET ITEM BY ID
router.get("/:id", async function (req, res, next) {
  try {
    const reqId = parseInt(req.url.substring(1));
    const item = await Item.find({ id: reqId }).select("-_id -__v");
    if (item.length == 0) {
      return res.status(404).json({ message: "Item not found." });
    }
    return res.status(200).json(item[0]);
  } catch (error) {
    return res.status(404).json({ message: "Error fetching item." });
  }
});

module.exports = router;
