const express = require("express");
const { connectToDb, getDb } = require("../helpers/db");
const timedModeRouter = express.Router();

let db;
connectToDb((err) => {
  if (!err) {
    db = getDb();
  }
});

/**
 * Dynamic endpoint to update the users best score for timed mode. It will get
 * the users username, look them up, and update 'bestScore' field.
 */
timedModeRouter.put("/updateTimedBestScore/:username", (req, res) => {
  db.collection("Users")
    .updateOne(
      // Query that looks for the user.
      { username: req.params.username },
      // Field to be updated
      { $set: { timedGameMode: { bestScore: req.body.score } } }
    )
    .then(() => {
      res.status(200).json({ msg: "Timed mode best score updated." });
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Timed mode best score couldn't be updated." });
    });
});

/**
 * Dynamic endpoint to update the users best score for timed mode. It will get
 * the users username, look them up, and update 'bestScore' field.
 */
timedModeRouter.put("/updateUnlimitedBestScore/:username", (req, res) => {
  db.collection("Users")
    .updateOne(
      // Query that looks for the user.
      { username: req.params.username },
      // Field to be updated
      { $set: { unlimitedMode: { bestScore: req.body.score } } }
    )
    .then(() => {
      res.status(200).json({ msg: "Timed mode best score updated." });
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Timed mode best score couldn't be updated." });
    });
});

module.exports = timedModeRouter;
