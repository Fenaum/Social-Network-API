const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost/social-network-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    // Remove existing data from the collections
    await db.User.deleteMany({});
    await db.Thought.deleteMany({});

    // Create users and thoughts
    const createdUsers = await db.User.create([
      { userName: "user1", email: "user1@example.com" },
      { userName: "user2", email: "user2@example.com" },
      { userName: "user3", email: "user3@example.com" },
      // Add more user objects as needed
    ]);

    const createdThoughts = await db.Thought.create([
      {
        thoughtText: "Thought 1",
        username: "user1",
        userId: createdUsers[0]._id,
      },
      {
        thoughtText: "Thought 2",
        username: "user2",
        userId: createdUsers[1]._id,
      },
      {
        thoughtText: "Thought 3",
        username: "user3",
        userId: createdUsers[2]._id,
      },
      // Add more thought objects as needed
    ]);

    // Add thoughts to the users
    for (let i = 0; i < createdThoughts.length; i++) {
      const thought = createdThoughts[i];
      const user = createdUsers[i];
      user.thoughts.push(thought._id);
      await user.save();
    }

    // Add reactions to the thoughts
    for (let i = 0; i < createdThoughts.length; i++) {
      const thought = createdThoughts[i];
      const reaction = [
        {
          reactionBody: "Reaction 1",
          username: "user1",
          thoughtId: thought._id,
        },
        {
          reactionBody: "Reaction 2",
          username: "user2",
          thoughtId: thought._id,
        },
        {
          reactionBody: "Reaction 3",
          username: "user3",
          thoughtId: thought._id,
        },
        // Add more reaction objects as needed
      ];
      thought.reactions.push(...reaction);
      await thought.save();
    }

    console.log("Seed data inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();