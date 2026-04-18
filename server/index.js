const app = require("./app");
const databaseConnection=require("./db")
require("dotenv").config({ path: "./.env" });
databaseConnection();

app.listen(process.env.PORT, () => {
  console.log("Server running");
});