const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const Vote = require('../models/vote');
const Subreddit = require('../models/subreddit');

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userPosts = await Post.find({ userId: user._id });
    const postIds = userPosts.map(p => p._id);
    const upvoteCount = await Vote.countDocuments({ postId: { $in: postIds } });
    
    res.json({
      uid: user.uid,
      username: user.username,
      totalUpvotesReceived: upvoteCount,
      subscribedReddits: user.subscribedReddits
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { uid, username } = req.body;

    // Validate required fields
    if (!uid || !username) {
      return res.status(400).json({ error: 'uid and username are required' });
    }

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
