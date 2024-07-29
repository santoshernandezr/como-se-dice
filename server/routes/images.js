const express = require("express");
const { connectToDb, getDb } = require("../helpers/db");
const imageRouter = express.Router();

let db;
connectToDb((err) => {
  if (!err) {
    db = getDb();
  }
});

imageRouter.get("/getAllImages", (req, res) => {
  let pictures = [];
  db.collection("ProfilePictures")
    .find()
    .forEach((picture) => pictures.push(picture))
    .then(() => {
      res.status(200).json(pictures);
    })
    .catch(() => {
      res.status(500).json({ msg: "Couldn't fetch the pictures" });
    });
});

module.exports = imageRouter;
