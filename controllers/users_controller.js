const User = require('../models/user');
// const passport = require('passport');

// rendering profile page
module.exports.profile = function (req, res) {
    // if (req.cookies.user_id) {
    //     User.findById(req.cookies.user_id, function (err, user) {
    //         if (user) {
    //             return res.render('users', {
    //                 title: "Profile",
    //                 user: user
    //             });
    //         }

    //         return res.redirect('/users/sign-in');
    //     });
    // } else {
    //     return res.redirect('/users/sign-in');
    // }

    return res.render('users', {
        title: "Profile"
    });
}

// rendering sign-up page
module.exports.signUp = function (req, res) {

    // redirect to profile if already logged in
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('sign_up', {
        title: "Sign-up"
    });
}

// rendering sign-in page
module.exports.signIn = function (req, res) {

    // redirect to profile if already logged in
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('sign_in', {
        title: "Sign-in"
    });
}

// getting the sign up data
module.exports.create = function (req, res) {

    // if confirm password does not match
    if (req.body.password != req.body.confirm_password) { return res.redirect('back'); }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in finding user in signing up');
            return;
        }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('Error in creating user in signing up'); return }

                return res.redirect('/users/sign-in');
            })

        }

        else {
            return res.redirect('back');
        }

    });
}

// manual authenticatin

// module.exports.createSession = function (req, res) {
//     //find the user
//     User.findOne({
//         email: req.body.email
//     }, function (err, user) {
//         console.log('check');
//         if (err) {
//             console.log('Error in finding user in signing in');
//             return;
//         }

//         // user found
//         if (user) {

//             // password incorrect
//             if (user.password != req.body.password) {
//                 return res.redirect('back');
//             }

//             res.cookie('user_id', user.id);
//             return res.redirect('/users/profile');
//         }

//         // user not found
//         else {
//             return res.redirect('back');
//         }
//     });
//}



// sign in and create a session for the user using passport
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout();

    return res.redirect('/');
}
