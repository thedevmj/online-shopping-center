const mongoose = require("mongoose");

const databaseConnection = async () => {
  const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/bookStore";

  try {
    await mongoose.connect(mongoUri);
    console.log("database connected successfully !");
  } catch (err) {
    console.log("error failed to connect !", err);
  }
};

module.exports = databaseConnection;

