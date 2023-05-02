var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

var dbInit = require("./db/init");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var itemsRouter = require("./routes/items");

var app = express();

app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const startdb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://XicoCorreia:Francisco123@cluster0.ik7qm8j.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startdb();

app.use("/init", dbInit);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/items", itemsRouter);

module.exports = app;
