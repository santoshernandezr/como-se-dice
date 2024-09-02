const express = require("express");

// Requirements to instantiate a session cookie.
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Requirements to hash password.
const bcrypt = require("bcrypt");

// Requirment to use node-cron so we can schedule the trigger of endpoints.
const cron = require("node-cron");

// Helper functinos to connect to the database.
const { connectToDb, getDb } = require("./helpers/db");

// Helper functions to use when we schedule the trigger of endpoints.
const {
  createCronDatetime,
  formatDate,
  POSTOptions,
  createGuestUser,
} = require("./helpers/helperFunctions");

// Get a connection to the database.
let db;
connectToDb((err) => {
  if (!err) {
    db = getDb();
  }
});

// Instantiating the external routes that are in '/routes' directory.
const wordsRoute = require("./routes/words");
const timedModeRouter = require("./routes/timedMode");
const dailyChallengeModeRouter = require("./routes/dailyChallengeMode");
const usersRouter = require("./routes/users");
const imageRouter = require("./routes/images");

// This allows us to use the environment variables in our .env file: 'process.env.<KEY_VALUE>'
require("dotenv").config();

const port = process.env.PORT || 3001;
const app = express();

// Allows us to read the json that's incoming from the clients request.
app.use(express.json());

// Used to instantiate the session cookie.
app.use(
  cors({
    origin: ["http://localhost:3000/comosedice"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  // Instantiating the session
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // Cookie has a max age of x
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Telling our app to use these routes.
app.use("/words", wordsRoute);
app.use("/timedMode", timedModeRouter);
app.use("/dailyMode", dailyChallengeModeRouter);
app.use("/users", usersRouter);
app.use("/images", imageRouter);

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

/**
 * Endpoint that will try and get the user from the database. If the user exists, we check the password
 * and if it matches, then we login succesfully. If the user exists, but the password does not match then
 * we send a 403 denying them acces with a message that the password does not match. If the user doesn't
 * exist, we send back a 404 indicating that the user doesn't exist.
 */
app.post("/signin", (req, res) => {
  db.collection("Users")
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user != null) {
        /*
         Using the bcrypt .compare method to compare the hashed pasword that's in the database with the
         password (converted into hash password) the user tried using when logging in.
        */
        bcrypt.compare(req.body.password, user.password, (error, response) => {
          if (error) {
            console.log("Error: " + error);
          }

          if (response) {
            // Delete the password field from the object we send back as we don't want to show the password in the front end.
            delete user.password;

            // Set the session, named user, to the user we got from the database.
            req.session.user = user;
            console.log("Session cookie: " + req.session.user.name);
            console.log("Added new session for " + req.session.user.username);

            res.status(200).json({ Login: true, user: req.session.user });
          } else {
            res.status(403).json({ msg: "Password did not match" });
          }
        });
      } else {
        res.status(404).json({ msg: "User does not exist" });
      }
    });
});

/**
 * Endpoint to get the guest user object and create a session with the guest user object.
 */
app.get("/guest", (req, res) => {
  const guestUser = createGuestUser();

  req.session.user = guestUser;
  console.log("Guest user session: " + req.session.user.name);
  res.status(200).json({ Login: true, user: req.session.user });
});

/**
 * Endpoint that is called to check if the user has a valid session established.
 */
app.get("/signedIn", (req, res) => {
  // If the session is valid, send back the valid field as 'true' and populate the field 'user' with the session.
  if (req.session.user) {
    return res.json({ valid: true, user: req.session.user });
  }
  // Else populate the valid field with 'false' indicating the user does not have a valid session established.
  else {
    return res.json({ valid: false });
  }
});

/**
 * Endpoint that is called to 'destroy' the session that was established when the user signed in.
 */
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ loggedOut: true });
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
