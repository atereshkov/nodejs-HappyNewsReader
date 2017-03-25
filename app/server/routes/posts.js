var express = require('express');
var router = express.Router();

var db = require('../database/connection');
var Post = require('../models/post');

var request = require("request"),
    cheerio = require("cheerio");

var config = require('../config');

// todo extract middleware functions and code refactor

router.get('/', (req, res) => {
    res.send('Hello World from posts!')
});

router.get('/update', (req, res) => {

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
            res.send('Posts are parsed!')
        } else {
            console.log("Error: " + error);
            res.send("Error: " + error);
        }
    });
});

router.get('/:id', function (req, res) {

    Post.findById(req.params.id, function (err, post) {

        if (err) {
            res.statusCode = 500;

            return res.json({
                error: 'Server error'
            });
        } else {
            return res.json({
                status: 'OK',
                data: post
            });
        }

        if (!post) {
            res.statusCode = 404;

            return res.json({
                error: 'Not found'
            });
        }
    });
});

router.post('/', function (req, res) {

    var post = new Post({
        header: req.body.header,
        text: req.body.text,
        url: req.body.url,
        img: req.body.img
    });

    // todo extract and refactor
    Post.count({header: req.body.header}, function (err, count) {
        if (count > 0) {
            res.statusCode = 409;
            return res.json({
                error: 'Post with this header already exists'
            });
        } else {
            post.save(function (err) {
                if (err) {
                    console.log('Error', err);

                    if (err.name === 'ValidationError') {
                        res.statusCode = 400;
                        res.json({
                            error: 'Validation error'
                        });
                    } else {
                        res.statusCode = 500;

                        res.json({
                            error: 'Server error'
                        });
                    }
                } else {
                    return res.json({
                        status: 'OK',
                        data: post
                    });

                }
            });
        }
    });

});

module.exports = router;