const express = require("express");
const { connectToDb, getDb } = require("../helpers/db");
const usersRouter = express.Router();

let db;
connectToDb((err) => {
  if (!err) {
    db = getDb();
  }
});

/**
 * Function that will create a new user to be added to the database with their details.
 *
 * @param { JSON object } user JSON object that came in from the client.
 * @returns New user object with the users details.
 */
function createUserObject(user) {
  return {
    name: user.name,
    email: user.email,
    timedGameMode: {
      bestScore: 0,
    },
    username: user.username,
    password: user.password,
    dailyChallengeMode: {
      history: [],
      dailyChallengeCompleted: false,
    },
    profilePicture: user.profilePicture,
  };
}

/**
 * Endpoint that will try and get the user from the database. If the user exists, we check the password
 * and if it matches, then we login succesfully. If the user exists, but the password does not match then
 * we send a 403 denying them acces with a message that the password does not match. If the user doesn't
 * exist, we send back a 404 indicating that the user doesn't exist.
 */
usersRouter.post("/signin", (req, res) => {
  db.collection("Users")
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user != null) {
        if (req.body.password == user.password) {
          res.status(200).json({ msg: "Login successful", player: user });
        } else {
          res.status(403).json({ msg: "Password did not match" });
        }
      } else {
        res.status(404).json({ msg: "User does not exist" });
      }
    });
});

/**
 * Endpoint that checks the database to see if the username the user is trying to use is already taken/being used.
 */
usersRouter.get("/usernameExists/:username", (req, res) => {
  db.collection("Users")
    .findOne({ username: req.params.username })
    .then((user) => {
      if (user != null) {
        res.status(403).json({ msg: "Username already being used" });
      } else {
        res.status(200).json({ msg: "Username available" });
      }
    });
});

/**
 * Endpoint that checks the database to see if the email the user is trying to use is already taken/being used.
 */
usersRouter.get("/emailExists/:email", (req, res) => {
  db.collection("Users")
    .findOne({ email: req.params.email })
    .then((user) => {
      if (user != null) {
        res.status(403).json({ msg: "Email already being used" });
      } else {
        res.status(200).json({ msg: "Email available" });
      }
    });
});

/**
 * Endpoint that will add the new user object with their details to the database.
 */
usersRouter.put("/signup", async (req, res) => {
  db.collection("Users")
    .insertOne(createUserObject(req.body))
    .then(() => {
      res.status(200).json({ msg: "User added" });
    })
    .catch(() => {
      res
        .status(500)
        .json({ msg: "Something went wrong while adding the user" });
    });
});

module.exports = usersRouter;
