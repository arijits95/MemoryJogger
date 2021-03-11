const AuthModule = require('./Auth');
const MemoryModule = require('./Memory');

exports.load = function(app, db) {
    AuthModule.load(app, db);
    MemoryModule.load(app, db);
};
