const AuthController = require('./controller');

const installRoutes = (app) => {
    app.post('/register', AuthController.registrationHandler);
    app.post('/login', AuthController.loginHandler);
};

module.exports = {
    installRoutes
};