const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
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
        
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

const Dog = model("Dog", dogSchema);

module.exports = Dog;