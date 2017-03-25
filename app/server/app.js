const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');

const routes = require('./routes');
const config = require('./config');
const db = require('./database/connection');
// var path = require('path');

db()
    .then(
        onConnected => startServer(),
        onError => console.log("Error due connection to db: " + onError.message)
    );

function startServer() {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(config.API_URL, routes);
    // app.use(express.static(path.join(__dirname,config.STATIC_RESOURCES_PATH)));

    app.listen(config.PORT, function () {
        console.log(`Working on ${config.PORT}`)
    });
}

module.exports = app;