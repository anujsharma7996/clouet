const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// importing User model
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    function (req, email, password, done) {
        // find a user and establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                req.flash('error', err);
                return done(err);
            }

            // if user not found or incorrect password
            if (!user || user.password != password) {
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }

            // if user found
            return done(null, user);
        });
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// deserializing the uesr from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

// check if the uesr is authenticated
passport.checkAuthentication = function (req, res, next) {

    // if the user is signed in, then passon the request to the next function (controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {

        // req.user contains the current signed in user from the session cookies and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;