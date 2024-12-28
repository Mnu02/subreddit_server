// routes/voteRoutes.js
const express = require('express');
const router = express.Router();
const Vote = require('../models/vote');
const Post = require('../models/post');

// POST /api/votes
// Body: { userId, postId, value } where value is +1 or -1
router.post('/', async (req, res) => {
  try {
    const { userId, postId, value } = req.body;
    
    // Check if there's an existing vote by this user on this post
    const existingVote = await Vote.findOne({ userId, postId });

    if (!existingVote) {
      // Create a new vote
      const vote = new Vote({ userId, postId, value });
      await vote.save();
      return res.status(201).json(vote);
    } else {
      // If there's already a vote, update it
      existingVote.value = value;
      await existingVote.save();
      return res.json(existingVote);
    }

  } catch (error) {
    // If a user tries to vote again with a different value, we handle it here
    // For uniqueness or validation errors, return 400
    return res.status(400).json({ error: error.message });
  }
});

// DELETE /api/votes
// Body: { userId, postId } -> remove the user's vote entirely
router.delete('/', async (req, res) => {
  try {
    const { userId, postId } = req.body;
    await Vote.findOneAndDelete({ userId, postId });
    return res.json({ message: 'Vote removed' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
