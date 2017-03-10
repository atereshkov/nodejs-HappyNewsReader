var express = require('express');
var app = express();

app.listen(3000, function() {
    console.log('Working on 3000')
});

module.exports = app;