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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
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
