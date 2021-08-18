const User = require('../models/user');

// rendering profile page
module.exports.profile = function (req, res) {
    return res.render('users', {
        title: "Profile"
    });
}

// rendering sign-up page
module.exports.signUp = function (req, res) {
    return res.render('sign_up', {
        title: "Sign-up"
    });
}

// rendering sign-in page
module.exports.signIn = function (req, res) {
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