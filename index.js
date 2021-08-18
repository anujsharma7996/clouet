const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());

// setting up static files
app.use(express.static('./assets'));

// using express EJS Layouts
app.use(expressLayouts);

// extracting style and scripts from sub page into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// using express router
app.use('/', require('./routes'));

// setup EJS View Engine
app.set('view engine', 'ejs');
app.set('views', './views')

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`)
    }
    console.log(`Server running on port ${port}`)
});