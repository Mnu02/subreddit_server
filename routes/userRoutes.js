// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const Upvote = require('../models/vote');
const Subreddit = require('../models/subreddit');

// GET /api/users/:userId
// Return user info, subreddits they subscribe to, total upvotes, etc.
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Subreddits they subscribe to: 
    // This depends on how you store subscriptions. 
    // If you store them in the User object, you can just return them from the user doc.
    // For example:
    // const subscribedSubreddits = user.subscribedSubreddits;

    // Total upvotes: we can compute by checking how many Upvotes the user’s posts have:
    const userPosts = await Post.find({ userId: user._id });
    const postIds = userPosts.map(p => p._id);
    const upvoteCount = await Upvote.countDocuments({ postId: { $in: postIds } });
    
    // Construct a response
    res.json({
      id: user.uid,
      username: user.username,
      // subscribedSubreddits: user.subscribedSubreddits || [],
      totalUpvotesReceived: upvoteCount,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Example: POST /api/users
// When a new user signs in via Firebase, you might want to create a corresponding doc
router.post('/', async (req, res) => {
  try {
    const { uid, username } = req.body;
    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, username });
      await user.save();
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
