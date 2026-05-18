const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const { users } = require("../data");

function verifyToken(req, res, next) {
  const token = req.cookies.jwt || getBearerToken(req);

  if (!token) {
    return next(new AppError("Please log in to access this route.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret-change-me");
    const currentUser = users.find((user) => user.id === decoded.id);

    if (!currentUser) {
      return next(new AppError("The user for this token no longer exists.", 401));
    }

    req.user = currentUser;
    return next();
  } catch (error) {
    return next(new AppError("Invalid or expired token.", 401));
  }
}

function getBearerToken(req) {
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer ")) {
    return header.split(" ")[1];
  }

  return null;
}

module.exports = verifyToken;
