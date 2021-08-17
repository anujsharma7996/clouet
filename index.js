const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;

// using express EJS Layouts
app.use(expressLayouts);

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