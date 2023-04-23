var express = require("express");
var router = express.Router();
const { User } = require("../db/models/user");
const mongoose = require("mongoose");

/* GET users listing. Testing purposes */
router.get("/", async function (req, res, next) {
  const users = await User.find().select("-_id -__v");
  return res.status(200).json(users);
});

/* 
Create new User given body with username and password
Content-type must be x-www-form-urlencoded 
*/
router.post("/signup", async function (req, res, next) {
  content = JSON.parse(JSON.stringify(req.body));
  if (
    !content.hasOwnProperty("username") ||
    !content.hasOwnProperty("password")
  ) {
    return res.status(400).json({ message: "Bad Request" });
  }
  validation = await validateUser(content.username);
  if (!(validation === "Ok")) {
    return res.status(400).json({ message: validation });
  }

  try {
    newId = await findNextId();
    newUser = new User({ ...req.body, id: newId });
    await newUser.save();
    insertedUser = await User.find(newUser).select("-_id -__v -password");
    return res.status(201).json(insertedUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//User login requires query params ?username="someuser"&password="somepassword"
router.get("/login", async function (req, res, next) {
  content = req.query;
  if (
    !content.hasOwnProperty("username") ||
    !content.hasOwnProperty("password")
  ) {
    return res.status(400).json({ message: "Bad Request" });
  }
  findUser = await User.find({ username: String(content.username) });
  if (findUser.length == 0) {
    return res.status(404).json({ message: "Not found" });
  }
  if (!(content.password === findUser[0].password)) {
    return res.status(401).json({ message: "Error logging in" });
  }
  return res.status(200).json({ message: "Login sucessful" });
});

async function validateUser(name) {
  try {
    if (name.length < 3) {
      return "Username needs to be 3 characters at least";
    }
    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      return "Username needs to be alphanumeric";
    }
    content = await User.find({ username: name });
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
  count = await User.find().count();
  if (count == 0) {
    return 1;
  } else {
    val = await User.findOne().sort("-id").select("id");
    return val.id + 1;
  }
}

module.exports = router;
