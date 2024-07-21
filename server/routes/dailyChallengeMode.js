const express = require("express");
const { connectToDb, getDb } = require("../helpers/db");
const { words } = require("../helpers/words");
const {
  shuffle,
  getDate,
  getPreviousDay,
} = require("../helpers/helperFunctions");
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

/**
 * Endpoint to be called when the user finishes the daily challenge. The endpoint will do the following:
 *
 * 1. If the 'history' object has 6 elements, pop the last element, so the new element can go in.
 * 2. Increase the users 'streak' field if they played yesterday.
 * 3. Update the 'dailyChallengeMode.dailyChallengeCompleted' field to true, indicating the user completed the daily challenge.
 * 4. Insert todays daily challenge object to the 'history' object.
 */
dailyChallengeModeRouter.post("/updateUser/:username", (req, res) => {
  const previousDay = getPreviousDay();
  console.log("Previouos day: " + previousDay);
  const userScore = req.body.score;
  const userTime = req.body.time;

  const newRecord = { date: getDate(), time: userTime, score: userScore };

  try {
    // If 6 elements exist, then pop the last element out so we can add the current
    db.collection("Users").updateOne(
      {
        username: req.params.username,
        "dailyChallengeMode.history": { $size: 6 },
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

    res.status(200).json({ msg: "Updated user" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Endpont that will be called everyday at midnight to reset all the users 'dailyChallengeMode.DailyChallengeCompleted'
 * boolean value.
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

dailyChallengeModeRouter.get("/getUser/:username", (req, res) => {
  console.log("username: " + req.params.username);
  db.collection("Users")
    .findOne({ username: req.params.username })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: "Couldn't get the user" });
    });
});

module.exports = dailyChallengeModeRouter;
