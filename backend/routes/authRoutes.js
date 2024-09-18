const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
const authCheckToken = require('../middleware/authCheckMiddleware')
router.get('/checkAuth', authCheckToken, (req, res) => {
     res.json({ message: 'You have access to this protected route', user: req.user });
})
// Register user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);
router.post('/logout', authController.logout);
module.exports = router;
