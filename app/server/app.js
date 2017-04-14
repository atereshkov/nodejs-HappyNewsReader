const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const httpLogger = require('morgan');
const cron = require('node-cron');
const log = require('winston');
const updater = require('./parse/updater');

const routes = require('./routes');
const config = require('./config');
const db = require('./database/connection');
// var path = require('path');

db()
    .then(
        onConnected => startServer(),
        onError => log.error("Error due connection to db: " + onError.message)
    )
    .then(startCron)
    .catch(onError => {
        log.error(onError);
    });

function startServer() {
    app.use(httpLogger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(config.API_URL, routes);
    // app.use(express.static(path.join(__dirname,config.STATIC_RESOURCES_PATH)));

    app.listen(config.PORT, function () {
        log.info(`Server started and working on ${config.PORT}`)
    });
}

function startCron() {
    updater()
        .then(
            onUpdated => log.info("Data updated from cron.."),
            onError => log.error("Error: " + onError.message)
        )
        .catch(onError => {
            log.error(onError);
        });
}

module.exports = app;