const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const postsRoute = require("./routes/posts");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use("/posts", postsRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to database");
});

app.listen(8000);
