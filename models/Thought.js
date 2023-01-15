const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (date) => {
      if (date) return date.toISOString().split("T")[0];
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
  // [{ type: Schema.Types.ObjectId, ref: 'reactions'}],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
