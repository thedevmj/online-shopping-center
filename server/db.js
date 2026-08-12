const mongoose = require("mongoose");

const databaseConnection = async () => {
  const mongoUri =
    process.env.MONGODB_URI ||
    process.env.DATABASE_URL ||
    (process.env.NODE_ENV === "production"
      ? null
      : "mongodb://localhost:27017/bookStore");

  if (!mongoUri) {
    console.error(
      "Missing MongoDB connection string. Set MONGODB_URI or DATABASE_URL in Render environment variables."
    );
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("database connected successfully !");
  } catch (err) {
    console.log("error failed to connect !", err);
  }
};

module.exports = databaseConnection;

