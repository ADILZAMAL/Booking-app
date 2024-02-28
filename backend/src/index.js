const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config({path: process.env.DOTENV_CONFIG_PATH});
const mongoose = require("mongoose");
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const cookieParser = require("cookie-parser");
const path = require('path');

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(7000, () => {
  console.log("Server running on localhost:7000");
});
