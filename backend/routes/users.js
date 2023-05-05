const asyncHandler = require("express-async-handler");
const express = require("express");
const user = require("../controllers/userController");

const router = express.Router();

/* POST */
router.post("/login", asyncHandler(user.login));
router.post("/signup", asyncHandler(user.signup));
/* GET */
router.get("/", asyncHandler(user.getUsers));
router.get("/:username", asyncHandler(user.getUser));
router.get("/followers/:username", asyncHandler(user.getFollowers));
/* PUT */
router.put("/:username", asyncHandler(user.update));
router.put("/follow/:username", asyncHandler(user.addFollower));
router.put("/library/:username", asyncHandler(user.addItemToLibrary));
router.put("/wishlist/:username", asyncHandler(user.addItemToWishlist));


module.exports = router;
