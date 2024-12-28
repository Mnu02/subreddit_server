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

// POST /api/subreddits/:subredditId/subscribe
router.post('/:subredditId/subscribe', async (req, res) => {
  try {
    // 1) Identify the logged-in user (req.user._id or from token)
    const userId = req.body.userId; // or however you're passing it
    const subredditId = req.params.subredditId;

    // 2) Verify the subreddit exists (optional but good practice)
    const subreddit = await Subreddit.findById(subredditId);
    if (!subreddit) {
      return res.status(404).json({ error: 'Subreddit not found' });
    }

    // 3) Update the user's subscribedSubreddits if not already subscribed
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.subscribedSubreddits.includes(subredditId)) {
      user.subscribedSubreddits.push(subredditId);
      await user.save();
    }

    return res.json({ message: `Subscribed to subreddit ${subredditId}` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// DELETE /api/subreddits/:subredditId/subscribe
router.delete('/:subredditId/subscribe', async (req, res) => {
  try {
    const userId = req.body.userId;
    const subredditId = req.params.subredditId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove the subreddit from user's subscribedSubreddits
    user.subscribedSubreddits = user.subscribedSubreddits.filter(
      (id) => id.toString() !== subredditId
    );
    await user.save();

    return res.json({ message: `Unsubscribed from subreddit ${subredditId}` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;