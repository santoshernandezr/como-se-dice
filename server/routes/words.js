const express = require("express");
const { words } = require("../helpers/words");
const { shuffle } = require("../helpers/shuffle");
const wordsRouter = express.Router();

/**
 * Endpoint that will randomize the words.
 */
wordsRouter.get("/normalGameWords", (req, res) => {
  shuffle(words);
  res.send(words);
});

/**
 * Endpoint to get the 10 daily challenge words.
 */
wordsRouter.get("/dailyChallengeWords", (req, res) => {
  const shuffledWords = shuffle(words);
  const dailyWords = shuffledWords.slice(0, 10);
  res.send(dailyWords);
});

module.exports = wordsRouter;
