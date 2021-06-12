class AppError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
    }
    json() {
        return { 
            code: this.code, 
            message: this.message
        }
    }
}

const AppErrors = {
    InvalidUserRegistrationObject: () => new AppError(100, 'Invalid user object'),
    InvalidUserLoginObject: () => new AppError(101, 'Invalid user object'),
    UserNotFound: () => new AppError(102, 'User does not exists'), 
    UserAlreadyExists: () => new AppError(103, 'User already exists'), 
    InvalidLoginCredentials: () => new AppError(104, 'Invalid login credentials')
};

module.exports = { AppError, AppErrors };