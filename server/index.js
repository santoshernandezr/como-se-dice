import express from "express"
import words from "./words.js"
import shuffle from "./shuffle.js"

const app = express()

app.get("/api/getWords", (req, res) => {
    shuffle(words)
    console.log("Words after shuffle " + words[0].spanish)
    res.send(words)
})

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`)
})