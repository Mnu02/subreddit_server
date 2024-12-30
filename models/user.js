const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true }, // Changed from 'id' to 'uid'
    username: { type: String, required: true },
    subscribedReddits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subreddit' }]
}, {
    timestamps: true // Fixed typo
});

module.exports = mongoose.model('user', UserSchema);