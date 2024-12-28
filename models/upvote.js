const mongoose = require('mongoose');

const UpvoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true }
}, {
  timestamps: true
});

// Enforce one (user, post) upvote uniqueness
UpvoteSchema.index({ userId: 1, postId: 1 }, { unique: true });

module.exports = mongoose.model('upvote', UpvoteSchema);
