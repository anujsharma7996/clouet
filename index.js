const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());

app.use(cookieParser());

// setting up static files
app.use(express.static('./assets'));

// using express EJS Layouts
app.use(expressLayouts);

// extracting style and scripts from sub page into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup EJS View Engine
app.set('view engine', 'ejs');
app.set('views', './views')

// creating a session
app.use(session({
    name: 'clouet',
    // TODO chance the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// using express router
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`)
    }
    console.log(`Server running on port ${port}`)
});