const express = require("express");
const bookRoutes = require("./routes/book.routes");

const app = express();

app.use(express.json());
app.use("/api/book", bookRoutes);

module.exports = app;
