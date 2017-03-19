var request = require("request"),
    cheerio = require("cheerio");

var config = require('../config');

request(config.SITE_URL, function (error, response, body) {
    if (!error) {
        var parsedResults = [];

        var $ = cheerio.load(body);

        $('div.item').each(function (i, element) {
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

module.exports = request;