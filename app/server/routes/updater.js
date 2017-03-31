var express = require('express');
var router = express.Router();
var parser = require('../parse/parser');
const log = require('winston');

var Post = require('../models/post');

router.get('/', (req, res) => {

    parser.fetchPosts()
        .then(
            onParsed => onSuccess(onParsed),
            onError => onFailure(onError))
        .catch(onError => {
            log.error(onError);
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
            log.error(onError);
        });
    }

});

router.post('/', function (req, res) {



});

router.put('/', function (req, res) {



});

module.exports = router;