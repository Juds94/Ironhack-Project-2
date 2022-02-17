
const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");
const fileUploader = require('../config/cloudinary.config');
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
       profilePic:{           
           type:String,
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
