var express = require('express');
var router = express.Router();
const {User} = require("../db/models/user");
const mongoose = require("mongoose");

/* GET users listing. Testing purposes */
router.get('/',async function(req, res, next) {
  const users=await User.find().select('-_id -__v');
  return res.status(200).json(users);
});

module.exports = router;
