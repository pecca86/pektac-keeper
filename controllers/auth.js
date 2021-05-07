const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/User");
const AppError = require('../utils/AppError')

// GET /api/auth/
// Gets logged in user
// Private
module.exports.getLoggedInUser = wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({
      msg: "No user found",
    });
  }

  res.status(200).json({
    user,
  });
});

// POST /api/auth/
// Log in
// Public
module.exports.login = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return next(new AppError("Please enter email & password", 400))
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return next(new AppError("Invalid login credentials", 401))
  }

  const passwordValidated = await user.matchPassword(password);
  if (!passwordValidated) {
    return next(new AppError("Invalid login credentials", 401))
  }

  sendTokenResponse(user, 200, res);
});

// GET /api/auth/logout
// Logs out current user
// PRIVATE
module.exports.logout = wrapAsync(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 2 * 1000),
  });

  res.status(200).json({
    msg: "Logout successful",
  });
});

// === CONTROLLER FUNCTIONS ===

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create Jsonwebtoken for the user
  const token = user.getSignedJwtToken();

  // Create cookie
  const opts = {
    // end part converts it so that we get the number specified inside JWT_COOKIE_EXPIRE to days
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Send cookie trought https if in production
  if (process.env.NODE_ENV === "production") {
    opts.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, opts) // key, value, options
    .json({
      token,
    });
};
