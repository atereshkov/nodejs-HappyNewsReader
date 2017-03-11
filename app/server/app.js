var express = require('express');
var app = express();

var routes = require('./routes');
var config = require('./config');

var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://s13.ru/";

request(url, function (error, response, body) {
    if (!error) {
        var $ = cheerio.load(body);

        $('div.item').each(function(i, element) {
            var a = $(this);
            var header = a.children('.itemhead').text();
            var text = a.children('.itemtext').text();
            var url = a.children('.itemhead').attr('href');

            var metadata = {
                header: header,
                text: text,
                url: url
            };
            console.log(metadata);
        });

    } else {
        console.log("Error: " + error);
    }
});

app.use(config.API_URL, routes);

app.listen(config.PORT, function() {
    console.log(`Working on ${config.PORT}`)
});

module.exports = app;