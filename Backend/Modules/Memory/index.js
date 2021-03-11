const MemoryRouter = require('./route');
const MemoryDB = require('./db');

exports.load = (app, db) => {
    console.log('Loading Memory module');
    MemoryDB.createSchema(db);
    MemoryRouter.installRoutes(app);
};