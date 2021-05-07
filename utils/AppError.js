class AppError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        // since our class has a status, express will by default know we are talking about error handeling
        this.status = status;
    }
}

module.exports = AppError;