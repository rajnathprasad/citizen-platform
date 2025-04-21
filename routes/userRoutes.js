const express = require('express');
const router = express.Router();
const { renderProfilePage, updateProfile } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/profile', isAuthenticated, renderProfilePage);
router.post('/profile', isAuthenticated, updateProfile);

module.exports = router;
