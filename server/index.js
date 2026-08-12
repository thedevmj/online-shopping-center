const app = require("./app");
const databaseConnection = require("./db");
require("dotenv").config({ path: "./config/config.env" });

const port = process.env.PORT || 3000;

databaseConnection();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});