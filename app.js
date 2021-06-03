require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const port = 3000;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connnected"))
  .catch(() => console.log("DB connection failed"));

app.get("/", (req, res) => {
  res.send("hello fellas");
});

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
