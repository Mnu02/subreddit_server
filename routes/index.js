const express = require('express');
const router = express.Router();

// Import sub-routers
const subredditRoutes = require('./subredditRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');
const upvoteRoutes = require('./voteRoutes.js');

// Mount them
router.use('/subreddits', subredditRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);
router.use('/votes', upvoteRoutes);

module.exports = router;
