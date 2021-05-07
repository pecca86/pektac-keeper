const wrapAsync = require("../utils/wrapAsync");
const Contact = require("../models/Contact");
const User = require("../models/User");
const AppError = require("../utils/AppError");

//TODO: REFACTOR USER AND USER OWNERSHIP INTO A CONTROLLER FUNCTION!

// GET /api/contacts
// Get all contacts
// Private
module.exports.getContacts = wrapAsync(async (req, res, next) => {
  const contacts = await Contact.find({ user: req.user.id });

  res.status(200).json({
    count: contacts.length,
    contacts,
  });
});

// GET /api/contacts/:contactID
// Gets single contact
// Private
module.exports.getContact = wrapAsync(async (req, res, next) => {
  const contact = await Contact.findById(req.params.contactID);
  if (!contact) {
    return next(new AppError("No contact found", 404));
  }

  if (contact.user.toString() !== req.user.id) {
    return next(new AppError("Unauthorized!", 401));
  }

  res.status(200).json({
    contact,
  });
});

// POST /api/contacts/
// Create a single contact
// Private
module.exports.createContact = wrapAsync(async (req, res, next) => {
  const contact = await new Contact(req.body);
  contact.user = req.user.id;
  await contact.save();

  res.status(200).json({
    contact,
  });
});

// PUT /api/contacts/:contactID
// Updates existing contact
// Private
module.exports.updateContact = wrapAsync(async (req, res, next) => {
  let contact = await Contact.findById(req.params.contactID);
  if (!contact) {
    return next(new AppError("No contact found", 404));
  }

  if (contact.user.toString() !== req.user.id) {
    return next(new AppError("Unauthorized!", 401));
  }

  contact = await Contact.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    contact,
  });
});

// DELETE /api/contacts/:contactID
// Deletes existing contact
// Private
module.exports.deleteContact = wrapAsync(async (req, res, next) => {
  const contact = await Contact.findById(req.params.contactID);
  if (!contact) {
    return next(new AppError("No contact found", 404));
  }

  if (contact.user.toString() !== req.user.id) {
    return next(new AppError("Unauthorized!", 401));
  }

  await contact.remove();

  res.status(200).json({
    msg: "Contact deleted!",
  });
});
