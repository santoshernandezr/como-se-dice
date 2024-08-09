const express = require("express");
const { connectToDb, getDb } = require("../helpers/db");
const { words } = require("../helpers/words");
const { shuffle, getTodaysDate } = require("../helpers/helperFunctions");
const dailyChallengeModeRouter = express.Router();

let db;
connectToDb((err) => {
  if (!err) {
    db = getDb();
  }
});

/**
 * Dynamic endpoint that will get the user daily information. We will return the 'user.dailyChallengeMode.dailyChallengeCompleted'
 * to determine if the user completed the daily challeng and the users daily challenge 'history'.
 */
dailyChallengeModeRouter.get("/getUserDailyInfo/:username", (req, res) => {
  db.collection("Users")
    .findOne({ username: req.params.username })
    .then((user) => {
      res.status(200).json({
        completed: user.dailyChallengeMode.dailyChallengeCompleted,
        history: user.dailyChallengeMode.history,
      });
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Couldn't get the users daily challenge info." });
    });
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
 * Dynamic endpoint to be called when the user finishes the daily challenge. The endpoint will do the following:
 *
 * 1. If the 'history' object has 6 elements, pop the last element, so the new element can go in.
 * 2. Insert todays daily challenge object to the 'history' object.
 */
dailyChallengeModeRouter.post("/updateUser/:username", (req, res) => {
  const userScore = req.body.score;
  const userTime = req.body.time;

  const newRecord = { date: getTodaysDate(), time: userTime, score: userScore };

  try {
    // If 6 elements exist, then pop the last element out so we can add the current
    db.collection("Users").updateOne(
      {
        username: req.params.username,
        // Checks if the size of the 'history' array is greater than 6
        $expr: { $gt: [{ $size: "$dailyChallengeMode.history" }, 6] },
      },
      { $pop: { "dailyChallengeMode.history": 1 } }
    );

    // Add todays results to the history object in the users document.
    db.collection("Users").updateOne(
      { username: req.params.username },
      {
        $set: { "dailyChallengeMode.dailyChallengeCompleted": true },
        $push: {
          "dailyChallengeMode.history": { $each: [newRecord], $position: 0 },
        },
      }
    );

    res.status(200).json({ msg: "Updated user." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------- Endpoints called in cron job in `index.js` --------------------------------- //

/**
 * Endpont that will be called everyday at midnight to reset all the users
 * 'dailyChallengeMode.DailyChallengeCompleted' boolean value.
 */
dailyChallengeModeRouter.post("/resetDailyChallenge", (req, res) => {
  db.collection("Users")
    .updateMany(
      {
        "dailyChallengeMode.dailyChallengeCompleted": true,
      },
      { $set: { "dailyChallengeMode.dailyChallengeCompleted": false } }
    )
    .then(() => {
      res.status(200).json({
        msg: "All users daily challenge complete boolean set back to false.",
      });
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
