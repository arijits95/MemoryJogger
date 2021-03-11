const AuthService = require('./service');
const { server_response } = require('../../Helpers/server_response');

const registrationHandler = async (req, res) => {
    console.log('Register controller called');
    const { error, user, token } = await AuthService.register(req.body);
    const data = (error) ? null : { user, token };
    res.send(server_response(error == null, data, error ?? null));
};

const loginHandler = async (req, res) => {
    console.log('Login controller called');
    console.log(req.body);
    const { error, user, token } = await AuthService.login(req.body.email, req.body.password);
    const data = (error) ? null : { user, token };
    res.send(server_response(error == null, data, error ?? null));
};

const authorizationHandler = async (req, res, next) => {
    console.log(req.headers['authorization']);
    const user = await AuthService.validateToken(req.headers.authorization);
    console.log(user._id);
    if (user == null) {
        res
        .status(401)
        .json({'message':'Unauthorized'});
    } else {
        req.userId = user._id.toString();
        next();
    }
};

module.exports = { 
    registrationHandler,
    loginHandler,
    authorizationHandler
};