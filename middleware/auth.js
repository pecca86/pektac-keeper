/* Middleware for user and route authentication */
const jwt = require("jsonwebtoken");
const wrapAsync = require("../utils/wrapAsync");
const AppError = require("../utils/AppError");
const User = require("../models/User");

// Protect routes middleware, can be added directly to routes that we want to protect
exports.protect = wrapAsync(async (req, res, next) => {
  let token;

  // Check headers for token and that the token string includes 'bearer' (option 1)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // splits the string into an array where there is an empty space
    // This way we split out the 'bearer' string
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    // Check if token is set in the cookies (option 2)
    token = req.cookies.token;
  } else {
    token = req.header('x-auth-token')
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      msg: "Not authorized!",
    });
  }

  // Verify token
  try {
    // extract payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded token has an id value that we can use for finding which user it belongs to
    // we then assign the user to the req object
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({
      msg: "Not authorized!",
    });
  }
});
