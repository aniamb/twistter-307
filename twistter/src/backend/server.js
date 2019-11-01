const express = require('express');
const bodyParser = require("body-parser");
// const session = require('express-session');
const cors = require('cors');
const app = express();
const port = 5000;
const dbConnectionString = 'mongodb+srv://user:lebronjames@twistter-4gumf.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose');
let User = require('./models/user');
app.use(cors());
const bcrypt = require('bcrypt');


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());

mongoose.connect(dbConnectionString, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/home', (req, res) => res.send("I'm home"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.post('/register', function(req, res) {
  console.log(req.body);
  var user = new User(req.body);
  // use passport js to hash
  user.save()
  .then(user => {
        // res.status(200).json({'user': 'new user added to the db successfully'});
        res.redirect('http://localhost:3000/editprofile');

      })
  .catch(err => {
    console.log(err);
  });
      // redirect to editprofile
      // res.redirect('http://localhost:3000/editprofile');
  // res.end();
});


app.post('/editprofile', function(req, res) {
  console.log(req.body)
  // get global variable of userID, and update with bio
  // req.body should be bio
  res.redirect('http://localhost:3000/timeline');

  // need callback here
  // .then(function(data) {
  // });
});

//LOGIN PAGE CODE 
app.post('/login', function(req, res) {
  console.log('overall body ' + req.body); 
  User.findOne({ 
  'email': req.body.email }, function(err, user) {
    if (user) {
      //email exists
      if(bcrypt.compareSync(req.body.password, user.password)) {
        // Passwords match
        console.log('user found successfully');
        res.status(200).send('found successfully');
        res.end();
        //res.redirect('http://localhost:3000/timeline');
       } else {
        // Passwords don't match
        console.log('user not in base');
        res.status(400).send('Email or Password does not exist');
        res.end();
      } 
    } else {
        // user does not exist
        console.log('user not in base');
        res.status(400).send('Email or Password does not exist');
        res.end();
        //res.redirect('http://localhost:3000/login');
    }
 })
});
