const express = require('express');
// const session = require('express-session');
const cors = require('cors');
const app = express();
const port = 5000;
const dbConnectionString = 'mongodb+srv://user:lebronjames@twistter-4gumf.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose');

let User = require('./models/user');
app.use(express.urlencoded());
mongoose.connect(dbConnectionString, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var search=require('../Search');

app.get('/', (req, res) => res.send('Hello World!'));

// app.route('/search') // use post to collect the search parameter and use get to send the results back to the page
//     // react sends a post request and it is received here?
//     .get(function (req, res){ // send results to javascript page
//         // return a list (json or something) of usernames
//         // can send send to Search.js?
//         res.send("This is the search results")
//     })
//     .post(function(req, res){ // get the search parameter from javascript page
//         console.log(req.body.id);
//         console.log(req.body.token);
//         console.log(req.body.geo);
//     })

app.post('/search', search.test());



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
