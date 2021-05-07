const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/User");

// POST User
// Registers a new user
// Public
module.exports.registerUser = wrapAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });

  await user.save();

  sendTokenResponse(user, 200, res);
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
