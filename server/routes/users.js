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
        console.log("Name: " + user.name);
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

module.exports = usersRouter;
