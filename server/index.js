import express from "express"
import words from "./words.js"
import shuffle from "./shuffle.js"

const app = express()

/**
 * Endpoint that will randomize the words.
 */
app.get("/api/getWords", (req, res) => {
    shuffle(words)
    res.send(words)
})

/**
 * Endpoint to get the 10 daily challenge words.
 */
app.get("/api/dailyChallengeWords", (req, res) => {
    const shuffledWords = shuffle(words)
    const dailyWords = shuffledWords.slice(0, 10)
    res.send(dailyWords)
})

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`)
})