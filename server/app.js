const express = require("express");
const bookRoutes = require("./routes/book.routes");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const authRoutes = require("./routes/auth-routes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

if (fs.existsSync(path.join(__dirname, "config", "config.env"))) {
  dotenv.config({ path: path.join(__dirname, "config", "config.env") });
} else {
  dotenv.config();
}

const app = express();

const tmpDir = path.join(__dirname, "tmp");
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

const normalizeOrigin = (o) => (o || "").replace(/\/+$/, "");

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.CLIENT_URL,
]
  .filter(Boolean)
  .map(normalizeOrigin);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      const normalized = normalizeOrigin(origin);
      const isVercel = normalized.endsWith(".vercel.app");
      if (allowedOrigins.includes(normalized) || isVercel) {
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
    tempFileDir: tmpDir,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/book", bookRoutes);
app.use("/auth/user", authRoutes);

module.exports = app;
