var express = require('express');
var app = express();
const bodyParser = require('body-parser');

var routes = require('./routes');
var config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(config.API_URL, routes);

app.listen(config.PORT, function() {
    console.log(`Working on ${config.PORT}`)
});

module.exports = app;