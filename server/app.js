const express = require("express");
const bookRoutes = require("./routes/book.routes");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const authRoutes = require("./routes/auth-routes");
const cookieParser = require("cookie-parser");

require("dotenv").config({ path: "./config/config.env" });

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
  })
);
app.use("/api/book", bookRoutes);
app.use("/auth/user", authRoutes);

module.exports = app;
