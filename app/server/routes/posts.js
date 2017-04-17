const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// todo extract middleware functions and code refactor

router.get('/', (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    Post.find({'positive': true})
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({created_at: -1})
        .then(onSuccess, onFailure);

    function onSuccess(data) {
        return res.json({
            count: data.length,
            data: data
        });
    }

    function onFailure(error) {
        res.send("Error: " + error);
        next(new Error(error));
    }
});

router.get('/all', (req, res) => {

    Post.find()
        .then(onSuccess, onFailure);

    function onSuccess(data) {
        return res.json({
            count: data.length,
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
                data: post
            });
        }
    });
});

router.delete('/', function (req, res) {

    Post.remove({}, function (err) {
        if (err) {
            res.statusCode = 500;
            return res.json({
                error: 'Server error'
            });
        } else {
            return res.json({
                status: 'OK'
            });
        }
    });
});


module.exports = router;