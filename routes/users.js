const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/users");

// POST api/users
// Registers a new user
// Public
router.route("/").post(registerUser);

module.exports = router;
