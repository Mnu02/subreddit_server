// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// GET /api/comments/byPost/:postId
router.get('/byPost/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: -1 })
      .populate('userId');
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/comments
// create a new comment
router.post('/', async (req, res) => {
  try {
    const { body, userId, postId } = req.body;
    const comment = new Comment({ body, userId, postId });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
