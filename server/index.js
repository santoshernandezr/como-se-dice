const express = require('express');
const { connectToDb, getDb } = require('./db');
const { words } = require("./words");
const { shuffle } = require('./shuffle');
require('dotenv').config();

const port = process.env.PORT || 3001
const app = express();

// Database connection
connectToDb((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`Serve at http://localhost:${port}`);
        })
        db = getDb();
        console.log("We are connected to the database");
    }
})

/**
 * Endpoint that will randomize the words.
 */
app.get("/api/getWords", (req, res) => {
    shuffle(words);
    res.send(words);
})

/**
 * Endpoint to get the 10 daily challenge words.
 */
app.get("/api/dailyChallengeWords", (req, res) => {
    const shuffledWords = shuffle(words);
    const dailyWords = shuffledWords.slice(0, 10);
    res.send(dailyWords);
})
