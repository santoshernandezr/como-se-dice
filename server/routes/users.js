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
 * Endpoint that will try and get the user from the database. If the user exists and the password
 * matches then we will send a 200 response with the user.
 */
usersRouter.post("/signin", (req, res) => {
  db.collection("Users")
    .findOne({ email: req.body.email })
    .then((user) => {
      console.log("Name: " + user.name);
      if (req.body.password == user.password) {
        res.status(200).json({ msg: "Login successful", player: user });
      } else {
        res.status(500).json({ msg: "Password did not match!" });
      }
    });
});

module.exports = usersRouter;
