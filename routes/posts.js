const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

// creating a post
router.post('/create', passport.checkAuthentication, postsController.create);

// deleting a post
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

module.exports = router;