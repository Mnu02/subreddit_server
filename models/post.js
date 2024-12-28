const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  body: { type: String, required: true },
  
  // Which user created the post
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  subredditId: { type: mongoose.Schema.Types.ObjectId, ref: 'subreddit', required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('post', PostSchema);
