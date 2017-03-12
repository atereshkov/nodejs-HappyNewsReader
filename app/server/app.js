var express = require('express');
var app = express();

var routes = require('./routes');
var config = require('./config');

var request = require("request"),
    cheerio = require("cheerio");

request(config.SITE_URL, function (error, response, body) {
    if (!error) {
        var parsedResults = [];

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
            parsedResults.push(metadata);
        });
        console.log(parsedResults);
    } else {
        console.log("Error: " + error);
    }
});

app.use(config.API_URL, routes);

app.listen(config.PORT, function() {
    console.log(`Working on ${config.PORT}`)
});

module.exports = app;