const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const dogSchema = new Schema(
    {

        name: {
            type: String,
            unique: true,
            required: true,
        },

        Age: {
            type: Number,
            required: true
        },

        Size: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        }



    },

);

const Dog = model("Dog", dogSchema);

module.exports = Dog;