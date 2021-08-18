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