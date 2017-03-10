var express = require('express');
var app = express();

var routes = require('./routes');
var posts = require('./routes/posts'); // TODO extract this to router

const port = 3000;

app.use('/posts', posts);
app.use('/', routes);

app.listen(port, function() {
    console.log(`Working on ${port}`)
});

module.exports = app;