const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')


const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter a name!"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists."],
    require: [true, "Please insert an email!"],
  },
  password: {
    type: String,
    require: [true, "Please enter a password"],
    minlength: [5, "Password must contain at least 5 symbols."],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
},[{runValidators: true}]);


// Encrypt the user password using bcrypt
UserSchema.pre('save', async function (next) {
    // Prevent this middleware for checking if password was filled when resetting it
    if (!this.isModified('password')) {
        next();
    }

    // Check that a password, an email and a name is filled
    if (!this.password || !this.email || !this.name ) {
      return next(new AppError("Invalid information - Needs: Name, Email & Password", 400))
    }

    // use bcrpyt salt function that takes in parameter of how many rounds of salting
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // hashes the password with the salt
    next();
});

// Match user entered password to hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // bcrypt method for comparing entered password to the specific user's password
  return await bcrypt.compare(enteredPassword, this.password);
}


// Sign a Jason Webtoken when user is created / signed in with JSONWEBTOKEN
UserSchema.methods.getSignedJwtToken = function () {
    // jwt.sign takes in a payload of the following:
    // id, secret, token expiration time
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    )
}



module.exports = mongoose.model("User", UserSchema);
