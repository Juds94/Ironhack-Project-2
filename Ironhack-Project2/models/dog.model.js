const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");
const { syncIndexes } = require('./User.model');

const dogSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        age: {
            type: Number,
            required: true
        },

        size: {
            type: String,
            enum: ['BIG', 'MEDIUM', 'SMALL']
        },

        description: {
            type: String,
            required: true,
        },
        dogPic: {
            type: String,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

const Dog = model("Dog", dogSchema);

Dog.syncIndexes()

module.exports = Dog;
