const sentiment = require('sentiment');
const log = require('winston');
const words = require('../config/words.json');

module.exports = function(text) {
    const result = sentiment(text, words);
    log.info(result);

    return result;
};