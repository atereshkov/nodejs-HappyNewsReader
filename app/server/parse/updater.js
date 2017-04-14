var config = require('./../config');
const log = require('winston');
var parser = require('../parse/parser');
var Post = require('../models/post');

function updatePosts(onUpdated, onError) {

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
        onError(error);
    }

    function saveToDatabase(data) {
        Post.savePosts(data)
            .then(
                onSaved => onUpdated(data),
                onError => onError(onError.message)
            ).catch(onError => {
            log.error(onError);
        });
    }

}

function update() {
    return new Promise((onUpdated, onError) => {
        updatePosts(onUpdated, onError);
    });
}

module.exports = update;