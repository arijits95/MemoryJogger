const express = require('express');
const bodyParser = require('body-parser');
const { HOSTNAME, PORT, DATABASE_URL, DATABASE_NAME } = require('./config')
const Modules = require('./Modules');
const MongoClient = require('mongodb').MongoClient;
const MemoryService = require('./Modules/Memory/service');

var db;

const connnectToDB = async () => {
    try {
        const client = new MongoClient(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDb');
        return client.db();
    } catch (e) {
        console.log('Failure');
        console.log(e);
    }
};

const initializaApp = async () => { 
    try {
        db = await connnectToDB()

        const app = express();
        app.use(express.json());
        Modules.load(app, db);
        
        app.route('/demo')
            .post((req, res) => {
                console.log(req.body);
                res.send("Got it");
        });

        app.listen(PORT, HOSTNAME, () => {
            console.log(`Server running at http://${HOSTNAME}:${PORT}`);
        });

    } catch (e) {
        console.log(e);
    }
};

initializaApp();

