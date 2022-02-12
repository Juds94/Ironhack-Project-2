const mongoose = require ('mongoose')

const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const dogOwnerSchema = new Schema(
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

    description:{
      type: String,
      default: 'No existe description'
    },

    role:{
      type: String,
      enum: ['DOGOWNER']
    },

    phone:{
      type: Number,
      require: true,
    },

    dog:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Dog',
    },

  },
  {
    
    timestamps: true,
  }
);

const DogOwner = model("DogOwner", dogOwnerSchema);

module.exports = DogOwner;
