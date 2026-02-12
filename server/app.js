const express = require("express");
const bookRoutes = require("./routes/book.routes");
const cors=require("cors")

const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/book", bookRoutes);

module.exports = app;
