// routes/subredditRoutes.js
const express = require('express');
const router = express.Router();
const Subreddit = require('../models/subreddit');

// GET /api/subreddits
router.get('/', async (req, res) => {
  try {
    const subreddits = await Subreddit.find().sort({ createdAt: -1 });
    res.json(subreddits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/subreddits
// Example: create a new subreddit
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const subreddit = new Subreddit({ name, description });
    await subreddit.save();
    res.status(201).json(subreddit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/subreddits/:id
router.get('/:id', async (req, res) => {
  try {
    const subreddit = await Subreddit.findById(req.params.id);
    if (!subreddit) {
      return res.status(404).json({ error: 'Subreddit not found' });
    }
    res.json(subreddit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/subreddits/:id/subscribe
// (You might store this relationship in the User model or a separate Subscription model.)
router.post('/:id/subscribe', async (req, res) => {
  // Pseudocode:
  // 1) Get the current user from Firebase token or session
  // 2) Add the subreddit to the user's subscriptions, or handle however you want
  // For now, let's just say "OK"
  return res.json({ message: `Subscribed to subreddit ${req.params.id}` });
});

// DELETE /api/subreddits/:id/subscribe
router.delete('/:id/subscribe', async (req, res) => {
  // Similar to the above logic
  return res.json({ message: `Unsubscribed from subreddit ${req.params.id}` });
});

module.exports = router;
