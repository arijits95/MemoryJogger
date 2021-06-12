const AuthValidator = require('./validator');
const AuthDB = require('./db');
const { AppError, AppErrors } = require('../../Helpers/error');
const JWT = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../../config');
const Bcrypt = require('bcrypt');

const register = async (user) => {
    try {
        const isValid = AuthValidator.validateUserRegistrationObject(user);
        console.log(`Registration user object valid : ${isValid}`);
        if (!isValid) {
            throw AppErrors.InvalidUserRegistrationObject();
        } else {
            const userExists = await AuthDB.getUserByEmail(user.email);
            console.log(userExists);
            if (userExists) {
                throw AppErrors.UserAlreadyExists();
            } else {
                const passwordHash = await getHashForPassword(user.password);
                const result = await AuthDB.createUser({ 
                    name: user.name,
                    email: user.email,  
                    password: passwordHash
                });
                const token = getJwtToken();
                console.log(`User Obj DB : ${newUser}`);
                return { user: result.ops[0],
                        token: token };
            }
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
                const doesPasswordMatch = await passwordMatches(password, userObj.password);
                if (doesPasswordMatch) {
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
        console.log('Error :', e.json());
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

const getHashForPassword = async (password) => {
    const hash = await Bcrypt.hash(password, 10);
    console.log('Password : ' + password + ' Hash : ' + hash);
    return hash;
};

const passwordMatches = async (password, hash) => {
    const matches = await Bcrypt.compare(password, hash);
    const chash = await getHashForPassword(password);
    console.log('Password : ' + password + 'Hash : ' +  + ' Hash from DB: ' + hash);
    return matches;
}

module.exports = { 
    register,
    login,
    validateToken
}