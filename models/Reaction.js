const { Schema, Types } = require("mongoose");

// Establishing this as a subdocument schema in the Thought model.

const reactionSchema = new Schema(
  {
    // reactionId: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId(),
    // },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => {
        if (date) return date.toISOString().split("T")[0];
      },
    },
  },
  {
    timestamps:true,
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
