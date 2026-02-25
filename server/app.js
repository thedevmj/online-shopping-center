const express = require("express");
const bookRoutes = require("./routes/book.routes");
const cors=require("cors")
const fileUpload = require("express-fileupload");
const path=require("path");
const authRoutes=require("./routes/auth-routes")
require("dotenv").config({ path: "./config/config.env" });

const app = express();
app.use(cors())
app.use(express.json());

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: path.join(__dirname,"tmp")
}))
app.use("/api/book", bookRoutes);
app.use("/auth/user", authRoutes);

module.exports = app;
