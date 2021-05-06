const express = require('express')
const router = express.Router();

// GET api/users
router.get('/', (req, res) => {
    res.send('Users route')
})

// POST api/users
router.post('/', (req, res) => {
    res.send('Register a user')
})

module.exports = router;