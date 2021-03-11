const AuthValidator = require('./validator');
const AuthDB = require('./db');
const { AppError, AppErrors } = require('../../Helpers/error');
const JWT = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../../config');

const register = async (user) => {
    try {
        const isValid = AuthValidator.validateUserRegistrationObject(user);
        console.log(`Registration user object valid : ${isValid}`);
        if (!isValid) {
            throw new AppErrors.InvalidUserRegistrationObject();
        } else {
            const userObj = await AuthDB.createUser(user);
            const token = getJwtToken();
            console.log(`User Obj DB : ${userObj}`);
            return { user: userObj, 
                    token: token };
        }
    } catch (e) {
        console.log('Error :', e.json());
        return { error: e };
    }
};

const login = async (email, password) => {
    try {
        const isValid = AuthValidator.validateUserLoginObject({ email, password });
        console.log(`Login user object valid : ${isValid}`);
        if (!isValid) {
            console.log('Invalid User Login Object');
            throw AppErrors.InvalidUserLoginObject();
        } else {
            const userObj = await AuthDB.getUserByEmail(email);
            console.log(userObj);
            if (userObj == null) {
                console.log('User Not Found');
                throw AppErrors.UserNotFound();
            } else {
                if (userObj.password == password) {
                    const token = getJwtToken(email);
                    return { user: userObj, 
                            token: token };
                } else {
                    console.log('Invalid Login Credentials');
                    throw AppErrors.InvalidLoginCredentials();
                }
            }
        }
    } catch (e) {
        console.log('Error :', e);
        return { error: e };
    }
};

const validateToken = async (token) => {
    try {
        return await getUserForJwtToken(token);
    } catch (error) {
        return null;
    }
};

const getJwtToken = (email) => {
    let x = JWT.sign({ email: email }, PRIVATE_KEY, { expiresIn : '1h' });
    console.log(x);
    return x;
};

const getUserForJwtToken = async (token) => {
    const decodedToken = JWT.verify(token, PRIVATE_KEY);
    console.log('Decoded Token: ', decodedToken.email);
    return await AuthDB.getUserByEmail(decodedToken.email);
};

module.exports = { 
    register,
    login,
    validateToken
}