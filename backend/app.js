const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");

const path = require("path");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
// const morganMiddleware = require("./utils/requestLogger");

app.use(express.json({ limit: "10kb" }));
// app.use(morganMiddleware);

app.use(cookieParser());
app.enable("trust proxy");
app.use(express.static(path.join(__dirname, "../../client/build")));

app.use("/api/user", userRoutes);

app.all("*", async (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    return next(
      new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
    );
  }
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

app.use(globalErrorHandler);

module.exports = app;
