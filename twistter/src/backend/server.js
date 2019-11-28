const express = require('express');
const bodyParser = require("body-parser");
// const session = require('express-session');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000; // if a process env exists choose that port otherwise go 5000
const dbConnectionString = 'mongodb+srv://user:lebronjames@twistter-4gumf.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose');

let User = require('./models/user');
app.use(cors());
const bcrypt = require('bcrypt');


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());

if (process.env.NODE_ENV === 'production') {
    console.log("Made it into production");
    // Serve static files
    app.use(express.static(path.join(__dirname, '../../build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../../build', 'index.html'));
    });
}

mongoose.connect(dbConnectionString, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/home', (req, res) => res.send("I'm home"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.post('/server/register', function(req, res) {
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

app.post('/server/delete', function(req, res) {
  console.log(req.body.currUser);
  User.find({'handle':req.body.currUser}).remove().exec();
  // User.findOne({
  //   'handle': req.body.currUser }, function(err, user) {
  //     if(user){
  //       //delete account
  //       User.deleteOne({"handle": user.handle});
  //       console.log('delete account success')
  //     }else{
  //       //user not found
  //       console.log('delete account fail')
  //     }
  // })
});

app.post('/server/editprofile', function(req, res) {
  console.log(req.body)
  // get global variable of userID, and update with bio
  // req.body should be bio
  let currUser = req.body.currUser;
  console.log(typeof req.body.bio);

    User.findOneAndUpdate(
        {"handle" : currUser},
        {$set: {bio : req.body.bio} },
        function(err, items){
            if(err){
                res.status(400).send('Error happened when updating bio')
            }else{
                console.log("Successfully updated bio");
                res.status(200).send('bio updated');
            }
            res.end();
        }
    );

   // res.status(200).send('bio updated');
   // res.end();
});

//LOGIN PAGE CODE 
app.post('/server/login', function(req, res) {
  console.log('overall body ' + req.body); 
  User.findOne({ 
  'email': req.body.email }, function(err, user) {
    if (user) {
      //email exists
      if(bcrypt.compareSync(req.body.password, user.password)) {
        // Passwords match
        console.log('user found successfully');
        res.status(200).send(user.handle);
        res.end();
        //res.redirect('http://localhost:3000/timeline');
       } else {
        // Passwords don't match
        console.log('user not in base123');
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

app.post('/server/searchserver', function(req, res){
    console.log(req.body); // outputs {searchTerm: (whatever the parameter was}
    var handle = req.body.searchTerm;
    if (handle.charAt(0) === '@') {
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
});

app.post('/server/addmicroblogs', function(req, res){
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
app.post('/server/userprofile', function(req, res){
    // logger.info('message', {key : req.query.userHandle}, {message: "in server/userprofile"});
    //console.log(req.query.userHandle);
    console.log(req.body.userHandle);
    let handle = req.body.userHandle;
    User.findOne({
    'handle': handle}, function(err, user) {
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
});

//GETTING FOLLWERS OF CURRENT USER
app.get('/server/followers', function(req, res){
    // logger.info('message', {key: req.query.userHandle}, {message: "in server/followers"});
    console.log(req.query.userHandle);
    var userfollowers = [];
    User.findOne({ 
      'handle': req.query.userHandle}, function(err, user) {
        if (user) {
          // user exists 
          for (var i = 0; i < user.followers.length; i++) {
      //  userList.push(users[i].handle.repeat(1));
            userfollowers.push(user.followers[i]);      
          }
          console.log(userfollowers);
          res.status(200).json({results: userfollowers});
          res.end();
    
        } else {
          // user does not exist
          console.log('error getting followers');
          res.status(400).send('error getting followers');
          res.end();
        }
     })
  });

  //GETTING CURRENT USERS FOLLOWINGS
app.get('/server/following', function(req, res){
    // logger.info('message', {key: req.query.userHandle}, {message: "in server/following"});
    console.log(req.query.userHandle);
    var userfollowing = [];
    User.findOne({ 
      'handle': req.query.userHandle}, function(err, user) {
        if (user) {
          // user exists 
          for (var i = 0; i < user.following.length; i++) {
      //  userList.push(users[i].handle.repeat(1));
            userfollowing.push(user.following[i]);      
          }
          console.log(userfollowing);
          res.status(200).json({results: userfollowing});
          res.end();
    
        } else {
          // user does not exist
          console.log('error getting following');
          res.status(400).send('error getting following');
          res.end();
        }
     })
  });



// check if user follows the generic profile
app.get('/server/searchFollowers', function(req, res){
    // logger.info('message', {key: req.query.userHandle}, {message: "in server/searchFollowers"});
    User.findOne({
        'handle': req.query.userHandle}, function(err, user) {
        if (user) {
            // user exists
            let following = user.following;
            let found = false;
            for(let i = 0; i<following.length; i++){
                if(following[i] === req.query.otherHandle){
                    res.status(200).send({follow: true});
                    res.end();
                    found = true;
                }
            }
            if(!found){
                res.status(200).send({follow: false});
                res.end();
            }
        } else {
            // user does not exist
            console.log('user not in base');
            res.status(400).send('Email or Password does not exist');
            res.end();
        }
    })
});

// handle follow/unfollow logic. Add/remove genericUser to currUser's following list. Add/remove currUser to genericUser's follower's list
app.get('/server/followLogic', function(req, res){
    // check request to see if follow or unfollow. have access to genericUser and currUser's handle
    let genericUser = req.query.otherHandle;
    let currUser = req.query.userHandle;
    console.log("Generic user is " + genericUser);
    console.log("Curr user is " + currUser);
    console.log(typeof req.query.follow);
    if(req.query.follow === "true"){ // logic for following a user
        User.findOneAndUpdate(
            {"handle" : currUser},
            {$addToSet: {following : genericUser}}, // this adds the genericUser to the currUser's following list
            function(err, items){
                if(err){
                    console.log("Failed to update currUser's following list");
                    res.status(400).send("Error in following user");
                    res.end();
                }else {
                    User.findOneAndUpdate(
                        {"handle": genericUser},
                        {$addToSet: {followers: currUser}},
                        function (err, items) {
                            if (err) {
                                console.log("Failed to update genericUser's followers list");
                                res.status(400).send("Error occurred when following user. User may not exist");
                                res.end();
                            } else {
                                console.log("Successfully updated genericUser's followers list");
                                res.status(200).send();
                                res.end();
                            }
                        }
                    )
                }
            }
        );
    }else{ // logic for unfollowing a user
        User.updateOne(
            {"handle" : currUser},
            {$pull : {following : genericUser}},
            function (err,result){
                if(err){
                    console.log("Failed to unfollow genericUser");
                    res.status(400).send("Error in unfollowing user");
                    res.end();
                }else{
                    User.updateOne(
                        {"handle" : genericUser},
                        {$pull : {followers : currUser}},
                        function(err, results){
                            if(err){
                                console.log("Failed to update genericUser's followers list when unfolowing");
                                res.status(400).send("Error occurred when following user. User may not exist");
                                res.end();
                            }else{
                                console.log("Successfully updated genericUser's followers list when unfollowing");
                                res.status(200).send();
                                res.end(); // WHY THE FUCK DOES THIS NOT WORK
                            }
                        }
                    )
                }
            }
        );
    }
});

