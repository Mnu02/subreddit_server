const mongoose = require('mongoose')

const SubredditSchema = new mongoose.Schema({
    name : {type: String, required: true, unique: true},
    description: {type: String}
});

module.exports = mongoose.model('subreddit', SubredditSchema);