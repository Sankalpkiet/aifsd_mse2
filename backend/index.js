const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express(); // ✅ FIRST create app

// ✅ MIDDLEWARE
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// ✅ ROUTES
const authRoutes = require("./routes/aut");
const grievanceRoutes = require("./routes/grieveroute");

app.use("/api", authRoutes);
app.use("/api", grievanceRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running");
});

// ✅ DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err.message));

// ✅ SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});