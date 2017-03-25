var express = require('express');
var app = express();
const bodyParser = require('body-parser');

var routes = require('./routes');
var config = require('./config');
// var path =require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(config.API_URL, routes);
// app.use(express.static(path.join(__dirname,config.STATIC_RESOURCES_PATH)));

app.listen(config.PORT, function () {
    console.log(`Working on ${config.PORT}`)
});

module.exports = app;
