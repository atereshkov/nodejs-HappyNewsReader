var express = require('express');
var router = express.Router();
var parser = require('../parse/parser');
const log = require('winston');

var Post = require('../models/post');

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

module.exports = router;