const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  createContact
} = require("../controllers/contacts");

// GET /api/contacts
// Get all user's contacts
// PRIVATE
router.get('/', protect, getContacts)

// GET /api/contacts/:contactID
// Gets single contact
// Private
router.get('/:contactID', protect, getContact)

// POST /api/contacts
// Add new contact
// PRIVATE
router.post('/', protect, createContact)

// PUT /api/contacts/:contactID
// Update user's contact
// PRIVATE
router.put('/:contactID', protect, updateContact)

// DELETE /api/contacts/:contactID
// Delete a user's contact
// PRIVATE
router.delete('/:contactID', protect, deleteContact)

module.exports = router;
