var request = require("request"),
    cheerio = require("cheerio");

const config = require('nconf');
const log = require('winston');

function requestPosts(onParsed, onError) {
    request(config.get('site'), function (error, response, body) {
        if (error) {
            log.error("Error: " + error);
            onError(error);
        } else {
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
            onParsed(parsedResults);
        }
    });
}

function fetchPosts() {
    return new Promise((onParsed, onError) => {
        requestPosts(onParsed, onError);
    });
}

module.exports = {fetchPosts};