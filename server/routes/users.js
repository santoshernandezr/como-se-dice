const express = require("express");
const { connectToDb, getDb } = require("../helpers/db");
const usersRouter = express.Router();

// Requirements to hash password.
const bcrypt = require("bcrypt");
const saltRounds = 10;

let db;
connectToDb((err) => {
  if (!err) {
    db = getDb();
  }
});

/**
 * Endpoint that will add the new user object with their details to the database.
 */
usersRouter.put("/signup", async (req, res) => {
  /*
   Using the bcrypt .hash method to hash the users password in the database.
   NOTE: The hashed password will be stored in the variable 'hash', which is what we'll pass in the
   'password' field in the object we create for the user.
   */
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      console.log("Error: " + err);
    }

    db.collection("Users")
      .insertOne({
        name: req.body.name,
        email: req.body.email,
        timedGameMode: {
          bestScore: 0,
        },
        username: req.body.username,
        password: hash,
        dailyChallengeMode: {
          history: [],
          dailyChallengeCompleted: false,
        },
        profilePicture: req.body.profilePicture,
      })
      .then(() => {
        res.status(200).json({ msg: "User added" });
      })
      .catch(() => {
        res
          .status(500)
          .json({ msg: "Something went wrong while adding the user" });
      });
  });
});

/**
 * Dynamic endpoint that checks the database to see if the username the user is trying to use is already taken/being used.
 */
usersRouter.get("/usernameExists/:username", (req, res) => {
  db.collection("Users")
    .findOne({ username: req.params.username })
    .then((user) => {
      if (user != null) {
        res.json({ usernameAvailable: false });
      } else {
        res.json({ usernameAvailable: true });
      }
    });
});

/**
 * Dynamic endpoint that checks the database to see if the email the user is trying to use is already taken/being used.
 */
usersRouter.get("/emailExists/:email", (req, res) => {
  db.collection("Users")
    .findOne({ email: req.params.email })
    .then((user) => {
      if (user != null) {
        res.json({ emailAvailable: false });
      } else {
        res.json({ emailAvailable: true });
      }
    });
});

module.exports = usersRouter;
