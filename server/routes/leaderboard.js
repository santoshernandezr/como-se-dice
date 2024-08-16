const express = require("express");
const { connectToDb, getDb } = require("../helpers/db");
const leaderboardRouter = express.Router();

let db;
connectToDb((err) => {
  if (!err) {
    db = getDb();
  }
});

/**
 * Endpoint that will get the list of the best scores in timed game mode in descending order.
 */
leaderboardRouter.get("/getTimedModeList", (req, res) => {
  let timedModeRankList = [];
  db.collection("Users")
    .find()
    .sort({ "timedGameMode.bestScore": -1 })
    .forEach((user) => {
      timedModeRankList.push({
        username: user.username,
        email: user.email,
        bestScore: user.timedGameMode.bestScore,
      });
      //   timedModeRankList.push(user);
    })
    .then(() => {
      res.status(200).json(timedModeRankList);
    });
});

module.exports = leaderboardRouter;
