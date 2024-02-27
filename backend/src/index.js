const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.get("/api/test", async (req, res) => {
    res.json({message: "hello from express endpoint!"})
});

app.listen(7000, () => {
    console.log("Server running on localhost:7000");
});