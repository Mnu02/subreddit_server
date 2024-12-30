const mongoose = require('mongoose');

const SubredditSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Subreddit', SubredditSchema);