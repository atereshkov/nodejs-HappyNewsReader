var express = require('express');
var app = express();

var routes = require('./routes');
var config = require('./config');
var path =require('path');
var request = require("request"),
    cheerio = require("cheerio");

request(config.SITE_URL, function (error, response, body) {
    if (!error) {
        var parsedResults = [];

        var $ = cheerio.load(body);

        $('div.item').each(function(i, element) {
            var item = $(this);
            var header = item.children('.itemhead').children('h3').children('a').prev().text();
            var text = item.children('.itemtext').text();
            var url = item.children('.itemhead').children('h3').children('a').prev().attr('href');
            var img = item.children('.itemtext').children('p').children('a').children('img').attr("src");

            var metadata = {
                header: header,
                text: text,
                url: url,
                img: img
            };
            parsedResults.push(metadata);
        });
        console.log(parsedResults);
    } else {
        console.log("Error: " + error);
    }
});

app.use(config.API_URL, routes);
app.use(express.static(path.join(__dirname,config.STATIC_RESOURCES_PATH)));
app.listen(config.PORT, function() {
    console.log(`Working on ${config.PORT}`)
});

module.exports = app;
