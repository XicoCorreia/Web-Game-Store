const { Item } = require("../models/item");
const { User } = require("../models/user");

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
  console.log(req.params);
  const username = req.params.username;
  const users = await User.findOne({ username: username });
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
  user = await User.updateOne({ username: username }, user);
  if (!user) {
    res.status(404).json();
  }
  res.status(204).json();
};

/**
 * Adds the item with the given `title` to the user's wishlist.
 * The request body should contain the `title` of the item.
 */
exports.addItemToWishlist = async (req, res, _next) => {
  const username = req.params.username;
  const { title } = req.body;
  if (!username || !title) {
    res.status(400).json();
  }
  const item = await Item.findOne({ title: title });

  await User.findOneAndUpdate(
    { username: username },
    {
      $addToSet: {
        wishlist: item,
      },
    }
  );
  res.status(204).json();
};

/**
 * Adds the item with the given `title` to the user's library.
 * The request body should contain the `title` of the item.
 */
exports.addItemToLibrary = async (req, res, _next) => {
  const username = req.params.username;
  const { title } = req.body;
  if (!username || !title) {
    res.status(400).json();
  }
  const item = await Item.findOne({ title: title });

  await User.findOneAndUpdate(
    { username: username },
    {
      $addToSet: {
        library: item,
      },
    }
  );
  res.status(204).json();
};

/**
 * Follows the user with the `username` given by the query params.
 * Updates both the current user and the followed user's
 * `following` and `followers` lists, respectively.
 */
exports.addFollower = async (req, res, _next) => {
  const usernameToFollow = req.params.username;
  const { username } = req.body;

  const user = await User.findOne({ username: username });

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

  await user?.updateOne({ $addToSet: { following: userToFollow } });
  res.status(204).json();
};
