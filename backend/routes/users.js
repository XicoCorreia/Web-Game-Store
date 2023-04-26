var express = require("express");
var router = express.Router();
const { User } = require("../db/models/user");
const { Item } = require("../db/models/item");

/* GET users listing. Testing purposes */
router.get("/", async function (req, res, next) {
  const users = await User.find().select("-_id -__v");
  return res.status(200).json(users);
});

/* GET user by username*/
router.get("/:username", async function (req, res, next) {
  const username = req.url.substring(1);
  const user = await User.find({ username: username }).select(
    "-_id -__v -password"
  );
  if (user.length == 0) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(user[0]);
});

/* UPDATE user */
router.put("/:id", async function (req, res, next) {
  const id = req.params.id;
  const user_update = req.body;
  User.findByIdAndUpdate(id, user_update)
    .then((user) => {
      if (!user) {
        return res.status(400).json("User doesn't exist");
      }
      res.sendStatus(204);
    })
    .catch((err) => {
      return next(err);
    });
});

/*
Create new User given body with username and password
Content-type must be x-www-form-urlencoded
*/
router.post("/signup", async function (req, res, next) {
  const content = JSON.parse(JSON.stringify(req.body));
  if (
    !Object.prototype.hasOwnProperty.call(content, "username") ||
    !Object.prototype.hasOwnProperty.call(content, "password")
  ) {
    return res.status(400).json({ message: "Bad Request" });
  }
  const validation = await validateUser(content.username);
  if (!(validation === "Ok")) {
    return res.status(400).json({ message: validation });
  }

  try {
    const newId = await findNextId();
    const newUser = new User({ ...req.body, id: newId });
    await newUser.save();
    const insertedUser = await User.findOne(newUser.id).select(
      "-_id -__v -password"
    );
    return res.status(201).json(insertedUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//User login requires query params ?username="someuser"&password="somepassword"
router.get("/login", async function (req, res, next) {
  const content = req.query;
  if (
    !Object.prototype.hasOwnProperty.call(content, "username") ||
    !Object.prototype.hasOwnProperty.call(content, "password")
  ) {
    return res.status(400).json({ message: "Bad Request" });
  }
  const findUser = await User.find({ username: content.username });
  if (findUser.length == 0) {
    return res.status(404).json({ message: "Not found" });
  }
  if (!(content.password === findUser[0].password)) {
    return res.status(401).json({ message: "Error logging in" });
  }
  return res.status(200).json(findUser);
});

/*
Follow user given body with username=username (username is username of user following ) follow=username (follow is username to follow)
Content-type must be x-www-form-urlencoded
*/
router.put("/follow", async function (req, res, next) {
  const content = JSON.parse(JSON.stringify(req.body));
  if (
    !Object.prototype.hasOwnProperty.call(content, "username") ||
    !Object.prototype.hasOwnProperty.call(content, "follow")
  ) {
    return res.status(400).json({ message: "Bad Request" });
  }
  const findUsers = await User.find({
    $or: [{ username: content.username }, { username: content.follow }],
  });
  if (findUsers.length != 2) {
    return res.status(404).json({ message: "Not found" });
  }
  let user1 = null;
  let user2 = null;
  if ((findUsers[0].username = content.username)) {
    user1 = findUsers[0];
    user2 = findUsers[1];
  } else {
    user1 = findUsers[1];
    user2 = findUsers[0];
  }
  if (
    !user1.following.includes(user2.username) &&
    !user2.followers.includes(user1.username)
  ) {
    user1.following.push(user2.username);
    user2.followers.push(user1.username);
  }
  try {
    await user1.save();
    await user2.save();
    return res.status(200).json({ message: "Added follower" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/*
Add item to library give body with username and title of game
Content-type must be x-www-form-urlencoded
*/
router.put("/library", async function (req, res, next) {
  const content = JSON.parse(JSON.stringify(req.body));
  if (
    !Object.prototype.hasOwnProperty.call(content, "username") ||
    !Object.prototype.hasOwnProperty.call(content, "title")
  ) {
    return res.status(400).json({ message: "Bad Request" });
  }
  const findUser = await User.findOne({ username: content.username });
  const findItem = await Item.findOne({ title: content.title });
  if (!findUser || !findItem) {
    return res.status(404).json({ message: "Not found" });
  }
  if (!findUser[0].library.includes(findItem[0].title)) {
    findUser[0].library.push(findItem[0].title);
  } else {
    return res.status(400).json({ message: "Item already in library" });
  }
  try {
    await findUser[0].save();
    return res.status(200).json({ message: "Item added to library" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/*
Add item to wishlist give body with username and title of game
Content-type must be x-www-form-urlencoded
*/
router.put("/wishlist", async function (req, res, next) {
  const content = JSON.parse(JSON.stringify(req.body));
  if (
    !Object.prototype.hasOwnProperty.call(content, "username") ||
    !Object.prototype.hasOwnProperty.call(content, "title")
  ) {
    return res.status(400).json({ message: "Bad Request" });
  }
  const findUser = await User.findOne({ username: content.username });
  const findItem = await Item.findOne({ title: content.title });
  if (!findUser || !findItem) {
    return res.status(404).json({ message: "Not found" });
  }
  if (!findUser[0].wishlist.includes(findItem[0].title)) {
    findUser[0].wishlist.push(findItem[0].title);
  } else {
    return res.status(400).json({ message: "Item already in wishlist" });
  }
  try {
    await findUser[0].save();
    return res.status(200).json({ message: "Item added to wishlist" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

async function validateUser(name) {
  try {
    if (name.length < 3) {
      return "Username needs to be 3 characters at least";
    }
    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      return "Username needs to be alphanumeric";
    }
    const content = await User.find({ username: name });
    if (content.length == 0) {
      return "Ok";
    } else {
      return "Username needs to be unique";
    }
  } catch (error) {
    return "Database Error";
  }
}

async function findNextId() {
  const count = await User.find().count();
  if (count == 0) {
    return 1;
  } else {
    const val = await User.findOne().sort("-id").select("id");
    return val?.id + 1;
  }
}

module.exports = router;
