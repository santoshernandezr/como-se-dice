const express = require("express");
const { connectToDb, getDb } = require("./helpers/db");

// Instantiating the external routes that are in '/routes' directory.
const wordsRoute = require("./routes/words");
const timedModeRouter = require("./routes/timedMode");
const usersRouter = require("./routes/users");

// This allows us to use the environment variables in our .env file: 'process.env.<KEY_VALUE>'
require("dotenv").config();

const port = process.env.PORT || 3001;
const app = express();

// Allows us to read the json that's incoming from the clients request.
app.use(express.json());

// Telling our app to use these routes.
app.use("/words", wordsRoute);
app.use("/timedMode", timedModeRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
