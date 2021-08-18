const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

// sign up router
router.get('/sign-up', usersController.signUp);

// sign in router
router.get('/sign-in', usersController.signIn);

// profile router
router.get('/profile', usersController.profile);

module.exports = router;