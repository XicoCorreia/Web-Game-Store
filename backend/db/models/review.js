const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    description: {type: string, required: true},
    stars: {type: number, required: true, min: 1, max: 5 },
    username: {type: string, required: true }
 });

const Review = mongoose.model("Review", ReviewSchema);

module.exports = { Review };
