const express = require("express");
const { words } = require("../helpers/words");
const { shuffle } = require("../helpers/helperFunctions");
const wordsRouter = express.Router();

/**
 * Endpoint that will randomize the words.
 */
wordsRouter.get("/normalGameWords", (req, res) => {
  shuffle(words);
  res.send(words);
});

module.exports = wordsRouter;
