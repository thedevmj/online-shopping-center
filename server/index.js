const app = require("./app");
const databaseConnection = require("./db");
const dotenv = require("dotenv");
const fs = require("fs");

if (fs.existsSync("./config/config.env")) {
  dotenv.config({ path: "./config/config.env" });
} else {
  dotenv.config();
}

const port = process.env.PORT || 3000;

databaseConnection();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});