const mongoose = require('mongoose');

const UpvoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
}, {
  timestamps: true
});

// Enforce one (user, post) upvote uniqueness
UpvoteSchema.index({ userId: 1, postId: 1 }, { unique: true });

module.exports = mongoose.model('Upvote', UpvoteSchema);
