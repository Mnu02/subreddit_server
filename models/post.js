const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  body: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  subredditId: { type: mongoose.Schema.Types.ObjectId, ref: 'subreddit', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
