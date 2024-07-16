const { MongoClient } = require("mongodb");
// This allows us to use the environment variables in our .env file: 'process.env.<KEY_VALUE>'
require("dotenv").config();

/*
 Exporting two functions: 'connectToDb' and 'getDb'
 - 'connectToDb' will get the connection to the "ComoSeDiceGame" database.
 - 'getDb' will get the connection, so we can use it to call the database.
 */
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(process.env.MONGODBURI)
      .then((client) => {
        dbConnection = client.db("ComoSeDiceGame");
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
