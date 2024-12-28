// routes/upvoteRoutes.js
const express = require('express');
const router = express.Router();
const Upvote = require('../models/upvote');

// POST /api/upvotes
// Body: { userId, postId }
router.post('/', async (req, res) => {
  try {
    const { userId, postId } = req.body;
    // Try creating a new upvote. If it fails because of uniqueness, handle error.
    const upvote = new Upvote({ userId, postId });
    await upvote.save();
    res.status(201).json(upvote);
  } catch (error) {
    // If a user tries to upvote the same post twice, they'll get a duplicate key error.
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/upvotes
// Body: { userId, postId }
router.delete('/', async (req, res) => {
  try {
    const { userId, postId } = req.body;
    await Upvote.findOneAndDelete({ userId, postId });
    res.json({ message: 'Upvote removed' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
