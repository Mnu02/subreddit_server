// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// GET /api/posts/:postId
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('userId').populate('subredditId');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// If you want "GET /api/subreddits/:subredditId/posts", 
// you could define that in `subredditRoutes.js` or here. 
// For clarity, let's define it here as a separate route:

// GET /api/posts/bySubreddit/:subredditId
router.get('/bySubreddit/:subredditId', async (req, res) => {
  try {
    const posts = await Post.find({ subredditId: req.params.subredditId })
      .sort({ createdAt: -1 })
      .populate('userId');
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/posts
// create a new post (the request body must have subredditId, title, body, userId, etc.)
router.post('/', async (req, res) => {
  try {
    const { title, body, userId, subredditId } = req.body;
    const post = new Post({ title, body, userId, subredditId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;