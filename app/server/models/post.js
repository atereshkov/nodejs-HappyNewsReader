var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    header: { type: String, required: true },
    text: { type: String, required: true },
    url: { type: String, required: true },
    img: { type: String, required: false }
});

module.exports = mongoose.model('Post', Post);