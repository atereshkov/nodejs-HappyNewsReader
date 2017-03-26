var mongoose = require('mongoose');
var config = require('./../config');
const log = require('winston');

var db = mongoose.connection;

function connectToDatabase(onConnected, onError) {
    mongoose.connect(config.DATABASE_CONNECTION_URL);

    db.once('open', function callback() {
        log.info("Connected to DB: " + config.DATABASE_CONNECTION_URL);
        onConnected('success');
    });

    db.on('error', function (err) {
        log.error('Connection error:', err.message);
        onError(err);
    });
}

function connect() {
    return new Promise((onConnected, onError) => {
        connectToDatabase(onConnected, onError);
    });
}

module.exports = connect;