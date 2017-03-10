var express = require('express');
var app = express();

var routes = require('./routes');
var config = require('./config');

app.use('/', routes);

app.listen(config.PORT, function() {
    console.log(`Working on ${config.PORT}`)
});

module.exports = app;