const express = require("express");
const cors = require("cors");

const matchRoutes = require("./routes/matchRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Matches Streaming API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/matches", matchRoutes);

module.exports = app;