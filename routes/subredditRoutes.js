// routes/subredditRoutes.js
const express = require('express');
const router = express.Router();
const Subreddit = require('../models/subreddit');
const Post = require('../models/post');

// GET /api/subreddits
router.get('/', async (req, res) => {
  try {
    const subreddits = await Subreddit.find()
      .select('name description subscribers')
      .lean(); // lean() returns plain JavaScript objects instead of Mongoose documents

    // Add subscriber count manually
    const result = subreddits.map(subreddit => ({
      ...subreddit,
      subscriberCount: subreddit.subscribers ? subreddit.subscribers.length : 0
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET /api/subreddits/:subredditId
// This only gets you one subreddit
router.get('/:subredditId', async (req, res) => {
  try {
      const subreddit = await Subreddit.findById(req.params.subredditId)
          .populate('subscribers', 'username');
      
      if (!subreddit) {
          return res.status(404).json({ error: 'Subreddit not found' });
      }

      const posts = await Post.find({ subredditId: req.params.subredditId })
          .populate('userId', 'username')
          .sort({ createdAt: -1 });

      res.json({
          subreddit,
          posts
      });
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

// POST /api/subreddits/:subredditId/subscribe
router.post('/:subredditId/subscribe', async (req, res) => {
  try {
      const { userId } = req.body;

      if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
      }

      const subreddit = await Subreddit.findById(req.params.subredditId);
      if (!subreddit) {
          return res.status(404).json({ error: 'Subreddit not found' });
      }

      if (!subreddit.subscribers.includes(userId)) {
          subreddit.subscribers.push(userId);
          await subreddit.save();
      }

      res.json({ message: 'Subscribed successfully', subreddit });
  } catch (error) {
      res.status(500).json({ error: error.message });
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