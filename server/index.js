const app = require("./app");
const databaseConnection=require("./db")

databaseConnection();

app.listen(3000, () => {
  console.log("Server running");
});