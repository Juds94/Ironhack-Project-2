
const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },

        username: {
            type: String,
            unique: true,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ['CARE', 'ADMIN', 'OWNER']
        },

        phone: {
            type: String,
            required: true,
        },

        dogSize: {
            type: String,
            enum: ['BIG', 'MEDIUM', 'SMALL']
        },

    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

module.exports = User;
