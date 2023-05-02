const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    description: {type: String, required: true},
    classification: {type: Number, required: true, min: 1, max: 5 },
    username: {type: String, required: true }
 });

const Review = mongoose.model("Review", ReviewSchema);

module.exports = { Review };
