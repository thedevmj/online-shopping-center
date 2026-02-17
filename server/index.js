const app = require("./app");
const databaseConnection=require("./db")
require("dotenv").config({ path: "./.env" });
databaseConnection();

app.listen(3000, () => {
  console.log("Server running");
});