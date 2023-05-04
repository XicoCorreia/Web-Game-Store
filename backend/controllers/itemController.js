const { Item } = require("../models/item");

/**
 * Gets all items, with optional filters.
 * If a `title` query param is provided, returns all items whose
 * `title` contains the given string (case-insensitive).
 */
exports.getItems = async (req, res, _next) => {
  const query = req.query.title
    ? { title: { $regex: req.query.title, $options: "i" } }
    : {};
  const items = await Item.find(query).sort({ title: 1 });
  res.json(items);
};

/**
 * Gets the item with the given `id`.
 */
exports.getItem = async (req, res, _next) => {
  const id = req.params.id;
  const item = await Item.findById(id);
  if (!item) {
    res.status(404).json();
  }
  res.json(item);
};

/**
 * Updates the item with the given `id`.
 * The request body should contain the updated `Item` object.
 */
exports.updateItem = async (req, res, _next) => {
  const id = req.params.id;
  let item = req.body;
  item = await Item.findByIdAndUpdate(id, item);
  if (!item) {
    res.status(404).json();
  }
  res.status(204).json();
};
