const jwt = require("jsonwebtoken");

function signToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "dev-secret-change-me",
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

function sendTokenCookie(res, user, statusCode = 200) {
  const token = signToken(user.id);
  const cookieDays = Number(process.env.COOKIE_EXPIRES_DAYS || 1);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: cookieDays * 24 * 60 * 60 * 1000
  });

  return res.status(statusCode).json({
    status: "success",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
}

module.exports = {
  signToken,
  sendTokenCookie
};
