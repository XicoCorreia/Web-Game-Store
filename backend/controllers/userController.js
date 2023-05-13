const { Item } = require("../models/item");
const { User } = require("../models/user");

const POPULATE_ALL = [
  "wishlist",
  "following",
  "followers",
  {
    path: "library",
    populate: {
      path: "item",
      model: "Item",
    },
  },
];

/**
 * Logs in the user with the given `username` and `password`.
 */
exports.login = async (req, res, _next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json();
  }
  const user = await User.findOne({ username: username });
  if (user?.password === password) {
    res.json(user);
  } else {
    res.status(401).json();
  }
};

/**
 * Creates a new user with the given `username` and `password`.
 */
exports.signup = async (req, res, _next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json();
  }
  const user = await User.create(req.body);
  res.status(201).json(user);
};

/**
 * Gets the user with the given `username`.
 */
exports.getUser = async (req, res, _next) => {
  const username = req.params.username;
  const users = await User.findOne({ username: username }).populate(
    POPULATE_ALL
  );
  res.status(200).json(users);
};

/**
 * Gets all users, with optional filters.
 * If a `username` query param is provided, returns all users whose
 * `username` contains the given string (case-insensitive).
 */
exports.getUsers = async (req, res, _next) => {
  const query = req.query.username
    ? { name: { $regex: req.query.username, $options: "i" } }
    : {};
  const users = await User.find(query);
  res.status(200).json(users);
};

/**
 * Updates the user with the given `username`.
 * The request body should contain the updated `User` object.
 */
exports.update = async (req, res, _next) => {
  const username = req.params.username;
  let user = req.body;
  user = await User.findOneAndUpdate({ username: username }, user, {
    new: true,
  }).populate(POPULATE_ALL);
  if (!user) {
    res.status(404).json();
  }
  res.status(200).json(user);
};

/**
 * Adds the items with the given `itemIds` to the user's wishlist.
 * The request body should contain the list of `itemIds`.
 */
exports.addItemsToWishlist = async (req, res, _next) => {
  const username = req.params.username;
  const itemIds = req.body.itemIds;

  if (!username || itemIds.length === 0) {
    res.status(400).json();
  }

  const user = await User.findOneAndUpdate(
    { username: username },
    {
      $addToSet: {
        wishlist: { $each: itemIds },
      },
    },
    { new: true }
  ).populate(POPULATE_ALL);

  res.status(200).json(user);
};

/**
 * Removes the items with the given `itemIds` from the user's wishlist.
 * The request body should contain the list of `itemIds`.
 */
exports.removeItemsFromWishlist = async (req, res, _next) => {
  const username = req.params.username;
  const itemIds = req.body.itemIds;

  if (!username || itemIds.length === 0) {
    res.status(400).json();
  }

  const user = await User.findOneAndUpdate(
    { username: username },
    {
      $pull: {
        wishlist: { $in: itemIds },
      },
    },
    { new: true }
  ).populate(POPULATE_ALL);

  res.status(200).json(user);
};

/**
 * Adds the items with the given `itemIds` to the user's library.
 * The request body should contain the list of `itemIds`.
 */
exports.addItemsToLibrary = async (req, res, _next) => {
  const username = req.params.username;
  const itemIds = req.body.itemIds;

  if (!username || itemIds.length === 0) {
    res.status(400).json();
  }

  const purchaseDate = new Date();
  const items = await Promise.all(itemIds.map((id) => Item.findById(id)));
  const ownedItems = items.map((item) => {
    return { item, purchaseDate };
  });
  const user = await User.findOneAndUpdate(
    { username: username, "item.id": { $nin: itemIds } },
    {
      $addToSet: {
        library: { $each: ownedItems },
      },
    },
    { new: true }
  ).populate(POPULATE_ALL);

  res.status(200).json(user);
};

/**
 * Follows the user with the `username` given by the query params.
 * Updates both the current user and the followed user's
 * `following` and `followers` lists, respectively.
 */
exports.addFollower = async (req, res, _next) => {
  const usernameToFollow = req.params.username;
  const { username } = req.body;

  let user = await User.findOne({ username: username });

  if (!user) {
    res.status(404).json(`User '${username}' not found.`);
  }

  const userToFollow = await User.findOneAndUpdate(
    { username: usernameToFollow },
    {
      $addToSet: {
        followers: user,
      },
    }
  );

  if (!userToFollow) {
    res.status(404).json(`User '${usernameToFollow}' not found.`);
  }

  user = await User.findOneAndUpdate(
    { username: user?.username },
    { $addToSet: { following: userToFollow } },
    { new: true }
  );
  res.status(200).json(user);
};

exports.getFollowers = async (req, res, _next) => {
  const username = req.params.username;
  const user = await User.findOne({ username: username }).populate("followers");
  if (!user) {
    res.status(404).json(`User '${username}' not found.`);
  } else {
    const followers = user.followers;
    res.status(200).json(followers);
  }
};

exports.getFollowing = async (req, res, _next) => {
  const username = req.params.username;
  const user = await User.findOne({ username: username }).populate("following");
  if (!user) {
    res.status(404).json(`User '${username}' not found.`);
  } else {
    const following = user.following;
    res.status(200).json(following);
  }
};
