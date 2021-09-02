const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

// router for home page
router.get('/', homeController.home);

// router for users page
router.use('/users', require('./users'));

//router for posts
router.use('/posts', require('./posts'));

// router for comments
router.use('/comments', require('./comments'));

// router for APIs
router.use('/api', require('./api'));

// router.use('/routerName', require('./routerFile));

module.exports = router;