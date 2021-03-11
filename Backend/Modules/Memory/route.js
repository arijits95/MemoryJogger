const MemoryController = require('./controller');
const AuthController = require('../Auth/controller');

const installRoutes = (app) => {
    app.post('/secure/memoryItem/add', AuthController.authorizationHandler,  MemoryController.addMemoryItem);
    app.get('/secure/memoryItems', AuthController.authorizationHandler, MemoryController.getMemoryItems);
};

module.exports = {
    installRoutes
};