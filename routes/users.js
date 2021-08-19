const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
const User = require('../models/user');

// profile router
router.get('/profile', usersController.profile);

// sign up page router
router.get('/sign-up', usersController.signUp);

// sign in page router
router.get('/sign-in', usersController.signIn);

// create user router
router.post('/create', usersController.create);

// login user router and using passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
), usersController.createSession);

module.exports = router;