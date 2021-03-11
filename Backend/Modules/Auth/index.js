const AuthRouter = require('./route');
const AuthDB = require('./db');

exports.load = (app, db) => {
    console.log('Loading Auth module');
    AuthDB.createSchema(db);
    AuthRouter.installRoutes(app);
};