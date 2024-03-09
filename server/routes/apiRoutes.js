const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { getPosts } = require('../controllers/postController');
const { authenticateToken } = require('../middleware/authMiddleware');
// const { validateSignup } = require('../utils/validation');

// Auth routes
router.post('/signup', signup);
// router.post('/login', login);

// Protected route
router.get('/posts', authenticateToken, getPosts);

module.exports = router;
