const User = require("../models/User");

// Modularizing and exporting these back to the user API route.
module.exports = {

  // Find all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //   Find a user based upon userId
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // omitting the version key in our returned information
      .select("__v")
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
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId }
        .then((user) => 
        !user 
        ? res.status(404).json({ message: "This user does not exist. Try again please"})
        

    )
  }

};
