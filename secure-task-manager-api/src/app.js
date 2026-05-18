const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const passport = require("passport");
const xss = require("xss-clean");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Secure Task Manager API"
  });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
