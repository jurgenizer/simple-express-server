const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session')

const app = express();
app.use(express.urlencoded({
    extended: true
  }));

app.use(session({
    'secret': 'A1B1C00DEFGHIJKLMNOPQRST'
  }))
app.use(express.static('public'));
app.set('view engine', 'pug');


app.get('/', (req, res) => {

//req.session.name = 'Jurgen'
//console.log(req.session.name) // 'Jurgen'

    console.log(req.headers)
    res.send('Hello World!');

});

// Create an 'about' view and render it with a variable
app.get('/about', (req, res) => {
    res.render('about', { name: 'Jurgen' })
  })

// Create a download view
app.get('/downloads', (req, res) => res.download('./downloads/document.pdf', 'user-facing-filename.pdf', (err) => {
    if (err) {
      //handle error
      return
    } else {
      //do something
    }
  })
)

// Named parameters
app.get('/uppercase/:theValue', (req, res) => res.send(req.params.theValue.toUpperCase()))

// Use a regular expression to match a path
// will match /post, /post/first, /thepost, /posting/something, etc.
// app.get(/post/, (req, res) => { /* */ })

// Cookie parser middleware
app.use(cookieParser());


// Validate form input
app.post('/form', [
    check('name').isLength({ min: 3 }),
    check('email').isEmail(),
    check('age').isNumeric()
  ], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
  
    const name  = req.body.name
    const email = req.body.email
    const age   = req.body.age
  })

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

