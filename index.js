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
const passportJWT = require('./config/passport-jwt-strategy');

const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

// setting up static files
app.use(express.static('./assets'));

// making the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

// using express EJS Layouts
app.use(expressLayouts);

// extracting style and scripts from sub page into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup EJS View Engine
app.set('view engine', 'ejs');
app.set('views', './views')

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'clouet',
    // TODO chance the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// using express router
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`)
    }
    console.log(`Server running on port ${port}`)
});