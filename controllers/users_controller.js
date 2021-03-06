const User = require('../models/user');
const fs = require('fs');
const path = require('path');

// rendering profile page
module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('users', {
            title: "Profile",
            profile_user: user
        });
    });
}

// updating profile info
module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log('Multer Error', err); return; }
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {
                    // if am avatar is already present, remove it
                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    // TODO - Show avatar for self profile
                    // TODO - Check if file is already present in storage

                    // saving path of the uploaded file into avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch {
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {
        return res.status(401).send('Unauthorized');
    }
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
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'You have been logged out');

    return res.redirect('/');
}
