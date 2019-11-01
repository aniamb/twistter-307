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
     //password hash
     bcrypt.hash(req.body.password, 10, function(err, hash){
      console.log(req.body);
       User.findOne({$or: [
          {'email' : req.body.email},
          {'handle': req.body.handle}]}).exec(function (err, user){
           if(user){
              //user with email/handle exists
              console.log('email or handle already in use');
              res.status(400).send('Email or handle already in use');
              res.end();
            }else{  
              //user unique ->add to db
              User.create({
              firstname : req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: hash,
              passwordConfirm: hash,
              handle: req.body.handle
              })
               res.status(200).send(req.body.handle);
               res.end();
            } 
          });
     
        });
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
  User.findOne({ 
  'email': req.body.email }, function(err, user) {
    if (user) {
      //email exists
      if(bcrypt.compareSync(req.body.password, user.password)) {
        // Passwords match
        console.log('user found successfully');
        res.status(200).send(user.body.handle);
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
})
app.post('/searchserver', function(req, res){
    console.log(req.body); // outputs {searchTerm: (whatever the parameter was}
    var handle = req.body.searchTerm;
    if (handle.charAt(0) == '@') {
      handle = handle.substring(1);
    }
    console.log(handle);
    // parse mongodb for users with that search term
    var userList = [];
    User.find({"handle": { "$regex": handle, "$options": "i" } }, function(err, users){
      if (err) throw err;
      console.log(users);

      for (var i = 0; i < users.length; i++) {
        console.log(typeof(users[i].handle));
      //  userList.push(users[i].handle.repeat(1));
        userList.push(users[i].handle);
  //      console.log(userList);
      }
      console.log(userList);
      res.status(200).json({results: userList});
      res.end();
    });
    // send a post request with the list to search.js
    // console.log("printing user list");
    // console.log(userList);
    // var squad = ["Albert", "Murugan", "Anita", "Netra", "Polymnia"];
    // res.status(200).json({results: squad});
    //res.end();
});

app.post('/addmicroblogs', function(req, res){
    console.log(req.body); // outputs {searchTerm: (whatever the parameter was}
    console.log(req.body.postBody);
    var post = req.body.postBody;
    console.log(post.length);
    if(post.length <= 280){
        // valid post
        res.status(200);
        // store in database
    }else{
        res.status(400);
    }
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