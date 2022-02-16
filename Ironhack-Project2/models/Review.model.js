const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,

        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
        },


    },

);

const Review = model("Review", reviewSchema);
module.exports = Review;
