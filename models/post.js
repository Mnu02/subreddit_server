const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  
  // Which user created the post
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subredditId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subreddit', required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);
