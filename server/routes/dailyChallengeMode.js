const express = require("express");
const { connectToDb, getDb } = require("../helpers/db");
const { words } = require("../helpers/words");
const { shuffle } = require("../helpers/helperFunctions");
const dailyChallengeModeRouter = express.Router();

let db;
connectToDb((err) => {
  if (!err) {
    db = getDb();
  }
});

/**
 * Endpoint that will get the daily challenge words from the database.
 */
dailyChallengeModeRouter.get("/getWords", (req, res) => {
  db.collection("DailyChallengeWords")
    .findOne({ words: { $size: 10 } })
    .then((words) => {
      if (words != null) {
        res.status(200).json(words.words);
      } else {
        res.status(500).json({
          error: "Error encounterd while trying to get daily challenge words.",
        });
      }
    });
});

/**
 * Endpoint to update the words in the database.
 */
dailyChallengeModeRouter.post("/updateWords", (req, res) => {
  shuffle(words);
  db.collection("DailyChallengeWords")
    .updateOne(
      { words: { $size: 10 } },
      { $set: { words: words.slice(0, 10) } }
    )
    .then(() => {
      res.status(200).json({ msg: "Daily challenge words updated." });
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Daily challenge words couldn't get updated." });
    });
});

module.exports = dailyChallengeModeRouter;
