const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getLoggedInUser, login, logout } = require("../controllers/auth");

// GET api/auth
// PRIVATE
router.get('/', protect, getLoggedInUser)

// GET /api/auth/logout
// PRIVATE
router.get('/logout', protect, logout);


// POST api/auth
// PUBLIC
router.route('/').post(login)

module.exports = router;
