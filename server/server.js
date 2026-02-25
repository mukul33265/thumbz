const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const authRouter = require("./routes/authRoutes");
const thumbnailRouter = require("./routes/thumbnailRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

/* ==============================
   ENV VARIABLES
============================== */
const DB_PATH = process.env.DB_PATH;
const SECRET_KEY = process.env.SECRET_KEY;

/* ==============================
   DATABASE CONNECTION
============================== */
mongoose.connect(DB_PATH)
  .then(() => console.log("✅ Mongo Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

/* ==============================
   TRUST PROXY (Required on Vercel)
============================== */
app.set("trust proxy", 1);

/* ==============================
   CORS CONFIG
============================== */
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://thumbz-client.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

/* ==============================
   BODY PARSER
============================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ==============================
   SESSION CONFIG
============================== */
app.use(session({
  name: "thumbz_session",
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: DB_PATH,
    collectionName: "sessions"
  }),
  cookie: {
    httpOnly: true,
    secure: true,        // MUST be true on Vercel (HTTPS)
    sameSite: "none",    // REQUIRED for cross-origin cookies
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}));

/* ==============================
   ROUTES
============================== */
app.get("/", (req, res) => {
  res.status(200).send("Server running 🚀");
});

app.use("/api/auth", authRouter);
app.use("/api/thumbnail", thumbnailRouter);
app.use("/api/user", userRouter);

/* ==============================
   EXPORT FOR VERCEL
============================== */
module.exports = app;