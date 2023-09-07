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
      { userName: "MichaelJordan", email: "michaelJordan@example.com" },
      { userName: "MikeTyson", email: "MikeTyson@example.com" },
      { userName: "MichaelJackson", email: "MichaelJackson@example.com" },
    ]);

    const createdThoughts = await db.Thought.create([
      {
        thoughtText: "I'm the best basketball player",
        username: "MichaelJordan",
        userId: createdUsers[0]._id,
      },
      {
        thoughtText: "I'm Iron Mike",
        username: "MikeTyson",
        userId: createdUsers[1]._id,
      },
      {
        thoughtText: "Hee Hee Hee",
        username: "MichaelJackson",
        userId: createdUsers[2]._id,
      },
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
          reactionBody: "Eeew",
          username: "MichaelJordan",
          thoughtId: thought._id,
        },
        {
          reactionBody: "Angry",
          username: "MikeTyson",
          thoughtId: thought._id,
        },
        {
          reactionBody: "LOL",
          username: "MichaelJackson",
          thoughtId: thought._id,
        },

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