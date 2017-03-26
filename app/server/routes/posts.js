var express = require('express');
var router = express.Router();
var parser = require('../parse/parser');

var Post = require('../models/post');

var request = require("request"),
    cheerio = require("cheerio");

// todo extract middleware functions and code refactor

router.get('/', (req, res) => {

    Post.find().then(onSuccess, onFailure);

    function onSuccess(data) {
        return res.json({
            status: 'OK',
            count_all: data.length,
            data: data
        });
    }

    function onFailure(error) {
        res.send("Error: " + error);
        next(new Error(error));
    }
});

router.get('/update', (req, res) => {

    parser.fetchPosts()
        .then(
            onParsed => onSuccess(onParsed),
            onError => onFailure(onError))
        .catch(onError => {
            console.log(onError);
        });

    function onSuccess(data) {
        saveToDatabase(data);
    }

    function onFailure(error) {
        res.send("Error: " + error);
        next(new Error(error));
    }

    function saveToDatabase(data) {
        Post.savePosts(data)
            .then(
                onSaved => res.send('Posts are parsed and saved to database: ' + onSaved),
                onError => res.send("Error during saving posts: " + onError.message)
            ).catch(onError => {
            console.log(onError);
        });
    }
});

router.get('/:id', function (req, res) {

    Post.findById(req.params.id, function (err, post) {

        if (!post) {
            res.statusCode = 404;

            return res.json({
                error: 'Not found'
            });
        }

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
    });
});

/*
router.post('/', function (req, res) {

    var post = new Post({
        header: req.body.header,
        text: req.body.text,
        url: req.body.url,
        img: req.body.img
    });

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
*/

module.exports = router;