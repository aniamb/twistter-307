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
  //password hash
    // bcrypt.hash(user.password, 10, function(err, hash){
    //check if email and handle are unique
    // TODO: ENSURE THIS IS CORRECT
    User.findOne({
      'email' : req.body.email,
      'handle': req.body.handle}, function (err, user){
        if(user){
          //user with email/handle exists
          console.log('email or handle already in use');
          res.status(400).send('Email or handle already in use');
          res.end();
        }else{
          //user unique -> add to database
          user.save()
          res.status(200).send(req.body.handle);
          res.end();
          
        }
      })
    });
//  });
  


//LOGIN PAGE CODE 
app.post('/login', function(req, res) {
  console.log(req.body);
  User.findOne({ 
  'email': req.body.email,
  'password':req.body.password }, function(err, user) {
    if (user) {
      // user exists 
      console.log('user found successfully');
     // res.redirect('http://localhost:3000/timeline')
    } else {
      // user does not exist
      console.log('user not in base');
      //res.redirect('http://localhost:3000/login');
    }
 })

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
  //console.log(req);

  User.findOne({ 
  'email': req.body.email,
  'password':req.body.password }, function(err, user) {
    if (user) {
      // user exists 
      console.log('user found successfully');
      res.status(200).send(user.handle);
      res.end();
      //res.redirect('http://localhost:3000/timeline');

    } else {
      // user does not exist
      console.log('user not in base');
      res.status(400).send('Email or Password does not exist');
      res.end();
      //res.redirect('http://localhost:3000/login');
    }
 })
})
app.post('/searchserver', function(req, res){
    console.log(req.body); // outputs {searchTerm: (whatever the parameter was}
    console.log(req.body.searchTerm);
    // parse mongodb for users with that search term
    // send a post request with the list to search.js
    var squad = ["Albert", "Murugan", "Anita", "Netra", "Polymnia"];
    res.status(200).json({results: squad});
    res.end();
});

//LOADING INFO INTO USER PROFILE CODE
app.get('/userprofile', function(req, res){
  console.log(req.query.userHandle);
  User.findOne({ 
    'handle': req.query.userHandle}, function(err, user) {
      if (user) {
        // user exists 
        var userInfo = {
          firstname: user.firstname,
          lastname: user.lastname
        }
        res.status(200).send(userInfo);
        res.end();
  
      } else {
        // user does not exist
        console.log('user not in base');
        res.status(400).send('Email or Password does not exist');
        res.end();
      }
   })
})