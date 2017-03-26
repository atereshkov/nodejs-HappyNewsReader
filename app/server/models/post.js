var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    header: {type: String, required: true},
    text: {type: String, required: true},
    url: {type: String, required: true},
    img: {type: String, required: false}
});

Post.statics.existWithUrl = function (url) {
    this.count({url: url}, function (err, count) {
        if (count > 0) {

        }
    });
};

Post.statics.savePosts = function (posts) {
    return new Promise((onSaved, onError) => {
        savePosts(posts, onSaved, onError);
    });
};

function savePosts(posts, onSaved, onError) {
    const PostModel = mongoose.model('Post', Post);

    for (let i = 0; i < posts.length; i++) {
        let post = new PostModel({
            header: posts[i].header,
            text: posts[i].text,
            url: posts[i].url,
            img: posts[i].img
        });

        post.save(function (err) {
            if (err) {
                console.log('Error', err);
            } else {
                console.log("Post with url " + posts[i].url + " saved");
            }
        });
    }
    onSaved(posts);
}

module.exports = mongoose.model('Post', Post);