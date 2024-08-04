const express = require("express");
const { connectToDb, getDb } = require("./helpers/db");
const cors = require("cors");

// Instantiating the external routes that are in '/routes' directory.
const wordsRoute = require("./routes/words");
const timedModeRouter = require("./routes/timedMode");
const usersRouter = require("./routes/users");
const imageRouter = require("./routes/images");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// Requirements to hash password.
const bcrypt = require("bcrypt");
const saltRounds = 10;

let db;
connectToDb((err) => {
  if (!err) {
    db = getDb();
  }
});

// This allows us to use the environment variables in our .env file: 'process.env.<KEY_VALUE>'
require("dotenv").config();

const port = process.env.PORT || 3001;
const app = express();

// Allows us to read the json that's incoming from the clients request.
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      expires: 60 * 10,
    },
  })
);

// Telling our app to use these routes.
app.use("/words", wordsRoute);
app.use("/timedMode", timedModeRouter);
app.use("/users", usersRouter);
app.use("/images", imageRouter);

/**
 * Endpoint that will try and get the user from the database. If the user exists, we check the password
 * and if it matches, then we login succesfully. If the user exists, but the password does not match then
 * we send a 403 denying them acces with a message that the password does not match. If the user doesn't
 * exist, we send back a 404 indicating that the user doesn't exist.
 */
app.post("/testingSignIn", (req, res) => {
  console.log("In the testing sign in endpoint");
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
            req.session.user = user;
            console.log(req.session.user);
            res.status(200).json({ msg: "Login successful", player: user });
          } else {
            res.status(403).json({ msg: "Password did not match" });
          }
        });
      } else {
        res.status(404).json({ msg: "User does not exist" });
      }
    });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
