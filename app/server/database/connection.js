var mongoose = require('mongoose');
const config = require('nconf');
const log = require('winston');

var db = mongoose.connection;

function connectToDatabase(onConnected, onError) {
    mongoose.connect(config.get('database:url'));

    db.once('open', function callback() {
        log.info("Connected to DB: " + config.get('database:url'));
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