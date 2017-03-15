var express = require('express');
var router = express.Router();

var db = require('../database/connection');
var Post = require('../models/post');

// todo extract middleware functions and code refactor

router.get('/', (req, res) => {
    res.send('Hello World from posts!')
});

router.get('/:id', function(req, res) {

    Post.findById(req.params.id, function (err, post) {

        if(!post) {
            res.statusCode = 404;

            return res.json({
                error: 'Not found'
            });
        }

        if (!err) {
            return res.json({
                status: 'OK',
                data: post
            });

        } else {
            res.statusCode = 500;

            return res.json({
                error: 'Server error'
            });
        }
    });
});

router.post('/', function(req, res) {

    var post = new Post({
        header: req.body.header,
        text: req.body.text,
        url: req.body.url,
        img: req.body.img
    });

    post.save(function (err) {
        if (!err) {
            return res.json({
                status: 'OK',
                data: post
            });

        } else {
            console.log('Error', err);

            if(err.name === 'ValidationError') {
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
        }
    });
});

module.exports = router;