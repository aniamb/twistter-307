const express = require('express');
const bodyParser = require("body-parser");
// const session = require('express-session');
const cors = require('cors');
const app = express();
const port = 5000;
const dbConnectionString = 'mongodb+srv://user:lebronjames@twistter-4gumf.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
let User = require('./models/user');
let Microblog = require('./models/microblog');
app.use(cors());


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

//search functionality
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
    var microblog = new Microblog(req.body);
    // microblog.save()

    microblog.save(function (err) {
      if (err) {
        console.log("ERRR");
        console.log(err);
      };
	// Next, find the User you want to leave the review for by ObjectId - mySpecifiedUserId and push the review ObjectId only
	// with the option to return the review data
      User.findOneAndUpdate(
		      {handle: req.body.username},
		      {"$push":{"microblog":microblog._id}},
		      {upsert:true, select:'microblog'}
	// populate and return the review data
      ).populate('microblog').exec(function(err, data) {
                console.log("lol");
                console.log(data);
        });
      });

      User.findOne({
      'handle': req.query.username}, function(err, user) {
        if (user) {
          console.log(user);
          var userInfo = user.microblog;
          microblogList = [];
          console.log(userInfo);
          for (let i = 0; i < userInfo.length; i++) {
            //for (var j = 0; j< userInfo.length; j++) {
            console.log('User Info: ' + userInfo[i]);
            console.log(typeof(userInfo[i]));
           var id = JSON.stringify(userInfo[i]);
            console.log("printing id");
            // console.log(id);
            // console.log(typeof(id));
          //  var id = id.substring(1,(id.length)-1);
          //  console.log(id);
        //  console.log("hi:" + ObjectId("\"${userInfo[i])}\""));
            Microblog.findById({'_id': ObjectId(userInfo[i])}, function(err, microblog) {
              if (err) {
                console.log(err);
              }
              if(microblog) {
                console.log("yyet");
                console.log(microblog[0]);
                // microblogList.push(microblog);
              }
                console.log("pbjghfhgfh");
            })

            //}
          }
          console.log(microblogList);
      //    res.status(200).json({microblog: userInfo});
            res.status(200).send("yeeHAWWWW");
        } else {
          console.log("user not in db");
        }
    })


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
