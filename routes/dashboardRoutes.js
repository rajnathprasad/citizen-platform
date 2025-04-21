const express = require('express');
const router = express.Router();
const { renderDashboard } = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', isAuthenticated, renderDashboard);
router.get('/dashboard', dashboardController.renderDashboard);

module.exports = router;
