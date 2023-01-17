const User = require("../models/User");

// Modularizing and exporting these back to the user API route.

module.exports = {
  // Find all users
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  //   Find a user based upon userId
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // omitting the version key in our returned information
      .select("-__v")
      .then((user) =>
        !user
          ? res
              .status(4040)
              .json({ message: "This user does not exist. Try again please." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //   Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update user targeting by userId
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "This user does not exist. Try again please." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //   delete user by ID and all Thoughts associated with the account
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "This user does not exist. Try again please" })
          : Thought.deleteMany({ _id: { $in: User.thoughts } })
      )
      .then(() => res.json({ message: "User successfully deleted" }))
      .catch((err) => res.status(500).json(err));
  },

  //   Add a new friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Unable to find user. Try again please." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Find a Friend by ID and delete them from a User's friend list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { _id: req.params.friendId } } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Unable to dins user. Try again please." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
