var express = require('express');
var app = express();

var routes = require('./routes');
var config = require('./config');

var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=02888";

request(url, function (error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            temperature = $("[data-variable='temperature'] .wx-value").html();

        console.log("Температура " + temperature + " градусов по Фаренгейту.");
    } else {
        console.log("Произошла ошибка: " + error);
    }
});

app.use(config.API_URL, routes);

app.listen(config.PORT, function() {
    console.log(`Working on ${config.PORT}`)
});

module.exports = app;