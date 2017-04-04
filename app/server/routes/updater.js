var express = require('express');
var router = express.Router();
var parser = require('../parse/parser');
const log = require('winston');

var Post = require('../models/post');
var Updater = require('../models/updater');

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

    switch (req.body.command) {
        case "start":
            log.info("command start updater");

            startUpdater();
            break;
        case "stop":
            log.info("command stop updater");

            stopUpdater();
            break;
        default:

            break;
    }

    function startUpdater() {

        Updater
            .getById("58e402e3c14ac824681f05be")
            .then(onUpdaterExists, onFailure);

        function onUpdaterExists(updater) {
            //if (updater.isRunning()) {
            //    res.send("Update process is already running");
            //} else {
            //    updater.setStatus("running");
            //    res.send("Started");
            //}

            res.send("Started");
        }

        function onFailure() {
            log.error("Error during getting updater from database")
            res.send("Error");
        }
    }

    function stopUpdater() {
        updater.setStatus("stopped");
        res.send("Stopped");
    }

});

router.put('/', function (req, res) {


});

module.exports = router;