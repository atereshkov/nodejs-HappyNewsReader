var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World from posts!')
});

module.exports = router;