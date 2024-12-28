const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    subscribedReddits: [{type: mongoose.Schema.Types.ObjectId, ref: 'subreddit'}]
} , {
    timestamp : true
});

module.exports = mongoose.model('user', UserSchema)