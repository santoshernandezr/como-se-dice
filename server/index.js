const express = require('express');
const { words } = require("./words");
const { shuffle } = require('./shuffle');
const { connectToDb, getDb } = require('./db');
// This allows us to use the environment variables in our .env file: 'process.env.<KEY_VALUE>'
require('dotenv').config();

const port = process.env.PORT || 3001
const app = express();

// Database connection
let db;
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
