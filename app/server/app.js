const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const httpLogger = require('morgan');
const cron = require('node-cron');
const log = require('winston');
const updater = require('./parse/updater');

const routes = require('./routes');
const db = require('./database/connection');

const config = require('nconf');

config.argv()
    .env()
    .file({ file: './config/config.development.json' });

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
    app.use(config.get('api:base'), routes);
    // app.use(express.static(path.join(__dirname,config.STATIC_RESOURCES_PATH)));

    app.listen(config.get('server:port'), function () {
        log.info(`Server started and working on ${config.get('server:port')}`)
    });
}

function startCron() {
    cron.schedule('*/1 * * * *', function () {
        updater()
            .then(
                onUpdated => log.info("Data updated from cron.."),
                onError => log.error("Error: " + onError.message)
            )
            .catch(onError => {
                log.error(onError);
            });
    });
}

module.exports = app;