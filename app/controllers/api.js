var request = require('request');

function makeDumbQuotes(string) {
    return string
        .replace('\u201c', '"') // opening "
        .replace('\u201d', '"') // closing "
        .replace('\u2018', '"') // opening '
        .replace('\u2019', '"'); // closing '

}

exports.search = function (req, res) {
    var user = req.user;

    request.get({
        url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + makeDumbQuotes(req.query.q),
        oauth: {
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            token: user.twitter.token,
            token_secret: user.twitter.tokenSecret
        },
        json: true
    }).pipe(res);
};

exports.user = function (req, res) {
    var user = req.user;

    request.get({
        url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + makeDumbQuotes(req.query.username),
        oauth: {
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            token: user.twitter.token,
            token_secret: user.twitter.tokenSecret
        },
        json: true
    }).pipe(res);
};
