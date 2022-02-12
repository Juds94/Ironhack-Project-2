const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const careSchema = new Schema(
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
        password: String,

       
        experience: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ['CARE']
        },

        phone: {
            type: Number,
            require: true,
        },

        typeDog:{
            type: String,
            required: true,
        }        

    },
    {

        timestamps: true,
    }
);

const Care= model("Care", careSchema);

module.exports = Care;
