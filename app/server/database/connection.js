var mongoose = require('mongoose');
var config = require('./../config');

var db = mongoose.connection;

function connectToDatabase(onConnected, onError) {
    mongoose.connect(config.DATABASE_CONNECTION_URL);

    db.once('open', function callback() {
        console.log("Connected to DB!");
        onConnected('success');
    });

    db.on('error', function (err) {
        console.log('Connection error:', err.message);
        onError(err);
    });
}

function connect() {
    return new Promise((onConnected, onError) => {
        connectToDatabase(onConnected, onError);
    });
}

module.exports = connect;