const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('comment', CommentSchema);
