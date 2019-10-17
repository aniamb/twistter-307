const express = require('express');
// const session = require('express-session');
const cors = require('cors');
const app = express();
const port = 5000;
const dbConnectionString = 'mongodb+srv://user:lebronjames@twistter-4gumf.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose');

let User = require('./models/user');
app.use(express.urlencoded());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });
  
  
  
  
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
  console.log(req.body);
  User.findOne({ 
  'email': req.body.email,
  'password':req.body.password }, function(err, user) {
    if (user) {
      // user exists 
      console.log('user found successfully');
      res.redirect('http://localhost:3000/timeline')
    } else {
      // user does not exist
      console.log('user not in base');
      //res.status(400).send('Email or Password does not exist');
      res.redirect('http://localhost:3000/login');
    }
 })
});
