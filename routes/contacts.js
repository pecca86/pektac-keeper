const express = require('express')
const router = express.Router();

// GET api/contacts
// Get all user's contacts
// PRIVATE
router.get('/', (req, res) => {
    res.send('Get users contacts')
})

// POST api/contacts
// Add new contact
// PRIVATE
router.post('/', (req, res) => {
    res.send('Create new contact')
})

// PUT api/contacts
// Update user's contact
// PRIVATE
router.put('/:contactID', (req, res) => {
    res.send('Update a contact')
})

// DELETE api/contacts
// Delete a user's contact
// PRIVATE
router.delete('/:contactID', (req, res) => {
    res.send('Contact DELETED!')
})



module.exports = router;