const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
  value: { type: Number, enum: [1, -1], required: true }  // +1 or -1
}, { timestamps: true });

VoteSchema.index({ userId: 1, postId: 1 }, { unique: true });

module.exports = mongoose.model('Vote', VoteSchema);
