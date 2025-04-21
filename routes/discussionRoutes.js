const express = require('express');
const router = express.Router();
const { viewScheme, postComment } = require('../controllers/discussionController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// View Scheme Page + Comments
router.get('/scheme/:id', isAuthenticated, viewScheme);

// Post Comment
router.post('/scheme/:id/comments', isAuthenticated, postComment);

module.exports = router;
