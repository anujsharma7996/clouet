const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "645125133187-oor23sq7i8eur36nncohjgjem0f8pdqt.apps.googleusercontent.com",
    clientSecret: "N5fTqCC_y-3JCblysmBsn0Z7",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},
    function (accessToken, refreshToken, profile, done) {
        // find a user
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) { console.log('error in google strategy-passport', err); return; }

            console.log(profile);

            if (user) {
                // if found, set as req.user
                return done(null, user);
            } else {
                // else create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) { console.log('error in creating user google strategy-passport', err); return; }

                    return done(null, user);

                });
            }
        });
    }
));

module.exports = passport;