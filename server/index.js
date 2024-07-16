const express = require("express");
const { connectToDb, getDb } = require("./helpers/db");

// Instantiating the external routes that are in '/routes' directory.
const wordsRoute = require("./routes/words");

// This allows us to use the environment variables in our .env file: 'process.env.<KEY_VALUE>'
require("dotenv").config();

const port = process.env.PORT || 3001;
const app = express();

// Telling our app to use these routes.
app.use("/words", wordsRoute);

// Database connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Serve at http://localhost:${port}`);
    });
    db = getDb();
    console.log("We are connected to the database");
  }
});
