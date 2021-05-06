const express = require('express')
const router = express.Router();

// GET api/auth
// PRIVATE
router.get('/', (req, res) => {
    res.send('Get logged in user')
})

// POST api/auth
// PUBLIC
router.post('/', (req, res) => {
    res.send('Log in user')
})

module.exports = router;