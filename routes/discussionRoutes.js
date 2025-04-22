const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const discussionController = require('../controllers/discussionController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Dashboard
router.get('/dashboard', isAuthenticated, dashboardController.renderDashboard);

// Scheme view & comment
router.get('/scheme/:id', isAuthenticated, discussionController.viewScheme);
router.post('/scheme/:id/comment', isAuthenticated, discussionController.postComment);

module.exports = router;
