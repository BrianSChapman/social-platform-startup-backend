const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

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
    lowercase:true,
    validate: isEmail,
  },
//   establishing relationship with Thought Schema
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'thought',
    },
  ],
//   Self-referencing the User table 
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
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

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
