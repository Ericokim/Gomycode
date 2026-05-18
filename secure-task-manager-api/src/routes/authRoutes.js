const bcrypt = require("bcryptjs");
const express = require("express");
const passport = require("passport");
const rateLimit = require("express-rate-limit");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { sendTokenCookie } = require("../utils/jwt");
const { users } = require("../data");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: "fail",
    message: "Too many login attempts. Please try again later."
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || "missing-client-id",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "missing-client-secret",
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.id}@google.local`;
  let user = users.find((item) => item.googleId === profile.id || item.email === email);

  if (!user) {
    user = {
      id: String(users.length + 1),
      name: profile.displayName || "Google User",
      email,
      googleId: profile.id,
      password: null
    };
    users.push(user);
  }

  return done(null, user);
}));

router.post("/signup", catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError("Name, email, and password are required.", 400));
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return next(new AppError("Email is already registered.", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = {
    id: String(users.length + 1),
    name,
    email,
    password: hashedPassword
  };

  users.push(user);
  return sendTokenCookie(res, user, 201);
}));

router.post("/login", loginLimiter, catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required.", 400));
  }

  const user = users.find((item) => item.email === email);
  const passwordIsCorrect = user && user.password && await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    return next(new AppError("Invalid email or password.", 401));
  }

  return sendTokenCookie(res, user);
}));

router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false
}));

router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/auth/google",
  session: false
}), (req, res) => {
  return sendTokenCookie(res, req.user);
});

module.exports = router;
