const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
const User = require('../models/user');

// profile router
router.get('/profile', usersController.profile);

// sign up router
router.get('/sign-up', usersController.signUp);

// sign in router
router.get('/sign-in', usersController.signIn);

// create user router
router.post('/create', usersController.create);

module.exports = router;