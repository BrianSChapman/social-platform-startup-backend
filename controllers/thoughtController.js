const Thought = require("../models/Thought");
const User = require("../models/user");
// const Reaction = require('../models/Reaction');
const { ObjectId } = require("mongoose").Types;

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single Thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Unable to find this thought." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //   create a new Thought and add it to user's existing Thought's array field.
  createThought(req, res) {
    Thought.create(req.body).then((thought) => res.json(thought));
    User.findOneAndUpdate(
      { _id: req.params.thoughts },
      { $addToSet: { thoughts: req.body } },
      { runValidators: true, new: true }
    ).catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },

  //  Update an existing Thought, targeting by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Unable to find this thought.' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

//   Delete an existing Thought, targeting by ID
deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) => 
    !thought ? res.status(404).json({ message: 'Unable to find this thought.'})
    : res.json({ message: 'Your thought has been deleted' }))
    .catch((err) => res.status(500).json(err));
    },

// Create a reaction to be stored in a Thought's 'reactions' array field
createReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.id},
        { $push: { reactions: reaction._id } },
        { runValidators: true, new: true }
    )
    .then((thought) => 
    !thought ? res.status(404).json({ message:'Unable to find this thought.' })
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err)) 
},

// Remove a reaction from a Thought by ReactionId
deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
    )
    .then((thought) =>
        !thought ? res.status(404).json({ message: 'Unable to find this thought.'})
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
}
};
