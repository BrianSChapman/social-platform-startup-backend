const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { userSeed, thoughtSeed, reactionSeed } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop the User data if it exists
  await User.deleteMany({});

  // Drop the Thought data if it exists
  await Thought.deleteMany({});

  // Create an empty array for our User data
  const users = [];

  // Loop through data and add to array
  for (let i = 0; i < userSeed.length; i++) {
    users.push({
      username,
      email,
      friends,
    });
  }

  // Creating empty array for Reactions data
  const reactions = [];
  // Loop through to add data to empty array
  for (let i = 0; i < reactionSeed.length; i++) {
    reactions.push({
      reactionBody,
      username,
    });

    // Creating empty array for Thought data
    const thoughts = [];
    // Loop through to add data to empty array
    for (let i = 0; i < thoughtSeed.length; i++) {
      thoughts.push({
        thoughtText,
        username,
        reactionBody,
      });
    }

    // add these users to the database collection
    await User.collection.insertMany(users);

    // Add the Thoughts to the collection
    await Thought.collection.insertMany(thoughts);
  }
});
