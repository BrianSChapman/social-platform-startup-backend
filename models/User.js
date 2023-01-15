const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const { ObjectId } = require('mongoose').Types;

// Creating Blueprint for what we want User documents to look like
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trimmed: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: isEmail,
  },
//   establishing relationship with Thought Schema
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
//   Self-referencing the User table 
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
{
// turning Virtuals on.
 toJSON: {
    virtuals: true,
 },
     id: false,   
    }
);

const User = model('User', userSchema);

module.exports = User;
