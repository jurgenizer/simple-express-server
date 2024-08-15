const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    console.log(req.headers)
    res.send('Hello World!');

});

// Create an 'about' view and render it with a variable
app.get('/about', (req, res) => {
    res.render('about', { name: 'Jurgen' })
  })
// Named parameters
app.get('/uppercase/:theValue', (req, res) => res.send(req.params.theValue.toUpperCase()))

// Use a regular expression to match a path
// will match /post, /post/first, /thepost, /posting/something, etc.
// app.get(/post/, (req, res) => { /* */ })

// Cookie parser middleware
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

