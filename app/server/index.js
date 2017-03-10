var express = require('express');
var app = express();

const port = 3000;

app.listen(port, function() {
    console.log(`Working on ${port}`)
});

module.exports = app;