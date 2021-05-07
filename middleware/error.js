/* Custom error handling */
const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {

    // Take in all error messages from err
    let error = { ...err };
    error.message = err.message;
    
    // Mongoose bad ObjectId
    if ( err.name === 'CastError') {
        const message = `Resource with id ${err.value} not found!`;
        error = new AppError(message, 404);
    }

    // Monhoose duplicate key (when set to unique)
    if ( err.code === 11000) {
        const message = "Key / field value already taken."
        error = new AppError(message, 400);
    }
    // Monhoose duplicate key (when set to unique)
    if ( err.code === 'E11000') {
        const message = "Key / field value already taken."
        error = new AppError(message, 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message)
        error = new AppError(message, 400);
    }
    
    res.status(error.status || 500).json({
        //success: false,
        error: error.message || 'Server Error.'
    });
}

module.exports = errorHandler;