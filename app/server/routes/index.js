var express = require('express');
var router = express.Router();

var posts = require('./posts');

router.use('/posts', posts);

module.exports = router;