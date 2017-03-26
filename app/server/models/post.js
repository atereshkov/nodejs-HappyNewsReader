var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    header: {type: String, required: true},
    text: {type: String, required: true},
    url: {type: String, required: true},
    img: {type: String, required: false}
});

Post.statics.isAlreadyExists = function (post) {
    return new Promise((onExist, onNoRecord, onError) => {
        const PostModel = mongoose.model('Post', Post);

        PostModel.count({url: post.url}, function (err, count) {
            if (err) {
                console.log(err);
                onError(err);
            }

            if (count > 0) {
                onExist(count);
            } else {
                onNoRecord(count);
            }
        });
    });
};

Post.statics.savePosts = function (posts) {
    return new Promise((onSaved, onError) => {
        savePosts(posts, onSaved, onError);
    });
};

// todo need promise for response
function savePosts(posts, onSaved, onError) {

    const PostModel = mongoose.model('Post', Post);
    let savedPostsCount = 0;

    for (let i = 0; i < posts.length; i++) {
        let post = new PostModel({
            header: posts[i].header,
            text: posts[i].text,
            url: posts[i].url,
            img: posts[i].img
        });

        PostModel.isAlreadyExists(post)
            .then(
                onExist => console.log("Post with url " + post.url + " already exists in database: " + onExist),
                onNoRecord => save(),
                onError => console.log(onError))
            .catch(onError => {
                console.log(onError);
            });

        function save() {
            post.save(function (err) {
                if (err) {
                    console.log('Error', err);
                } else {
                    console.log("Post with url " + posts[i].url + " saved");
                    savedPostsCount++;
                }
            });
        }
    }

    onSaved(savedPostsCount);
}

module.exports = mongoose.model('Post', Post);