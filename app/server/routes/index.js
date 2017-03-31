var express = require('express');
var router = express.Router();

var posts = require('./posts');
var updater = require('./updater');

router.use('/posts', posts);
router.use('/updater', updater);

module.exports = router;