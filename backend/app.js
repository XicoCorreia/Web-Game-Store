require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/items");

const app = express();

app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const mongodb_uri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/psi013";

const startdb = async () => {
  try {
    await mongoose.connect(mongodb_uri);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startdb();

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/items", itemsRouter);

const errorHandler = (err, req, res, _next) => {
  res.status(500).send({ error: err });
};

app.use(errorHandler);
module.exports = app;
