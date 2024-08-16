const express = require("express");
const { connectToDb, getDb } = require("./helpers/db");
const cron = require("node-cron");
const {
  createCronDatetime,
  formatDate,
  POSTOptions,
} = require("./helpers/helperFunctions");

// Instantiating the external routes that are in '/routes' directory.
const wordsRoute = require("./routes/words");
const timedModeRouter = require("./routes/timedMode");
const dailyChallengeModeRouter = require("./routes/dailyChallengeMode");
const usersRouter = require("./routes/users");
const imageRouter = require("./routes/images");
const leaderboardRouter = require("./routes/leaderboard");

// This allows us to use the environment variables in our .env file: 'process.env.<KEY_VALUE>'
require("dotenv").config();

const port = process.env.PORT || 3001;
const app = express();

// Allows us to read the json that's incoming from the clients request.
app.use(express.json());

// Telling our app to use these routes.
app.use("/words", wordsRoute);
app.use("/timedMode", timedModeRouter);
app.use("/dailyMode", dailyChallengeModeRouter);
app.use("/users", usersRouter);
app.use("/images", imageRouter);
app.use("/leaderboard", leaderboardRouter);

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

/*
  Scheduled cron job to be run every night at 12am. Calls the 'updateWords' endpoint to update the daily challenge words
  in the database and 'resetDailyChallenge' endpoint to update the users 'dailyChallengeMode.DailyChallengeCompleted' boolean value.
  */
cron.schedule(createCronDatetime("0", "0", "0", "*", "*", "*"), function () {
  const date = new Date();
  console.log("Daily challenge words were updated: " + formatDate(date));

  fetch(process.env.BASE_URL + "/dailyMode/updateWords", POSTOptions);

  fetch(process.env.BASE_URL + "/dailyMode/resetDailyChallenge", POSTOptions);
});
