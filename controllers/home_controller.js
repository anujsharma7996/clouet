const Posts = require('../models/post');
const User = require('../models/user');

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

            User.find({}, function (err, users) {
                return res.render('home', {
                    title: "Clouet | Home",
                    posts: posts,
                    all_users: users
                });
            });

        });
}

