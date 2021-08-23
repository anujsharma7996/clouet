const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
//const User = require('../models/user');

// profile router
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

// profile update
router.post('/update/:id', passport.checkAuthentication, usersController.update);

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

//
router.get('/sign-out', usersController.destroySession);

module.exports = router;