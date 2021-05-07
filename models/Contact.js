const mongoose = require("mongoose");
const AppError = require("../utils/AppError");

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: "personal",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

ContactSchema.pre("save", async function (next) {
  if (!this.name || !this.email) {
    return next(new AppError("Name and e-mail required!", 400));
  }
});

module.exports = mongoose.model("Contact", ContactSchema);
