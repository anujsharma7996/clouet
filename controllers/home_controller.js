const Posts = require('../models/post');

// controller for home page
module.exports.home = function (req, res) {
    // Posts.find({}, function (err, posts) {
    //     return res.render('home', {
    //         title: "Clouet | Home",
    //         posts: posts
    //     });
    // });


    // populate the user of each post
    Posts.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function (err, posts) {
            return res.render('home', {
                title: "Clouet | Home",
                posts: posts
            });
        });

}