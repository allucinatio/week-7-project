const express = require("express");
const bodyParser = require('body-parser');
const router = require('./routes.js')
const mongoose = require("mongoose");
const models = require('./models/tracker');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');
const app = express();

// app.use(passport.authenticate('basic', {session: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/tracker');


// first attempt at passport basic strategy:
passport.use(new BasicStrategy(
  function(username, password, done) {
    models.User.findOne({ username: username }, function(err, user){
      if (err) {
        return console.log("error at passport.use " + err);
      }
      // console.log("Is this getting the right user? " + user);
      if (user && bcrypt.compareSync(password, user.password)){
        return done(null, user);
      }
      return done(null, false);
    });
  }
));

app.get('/api/auth',
  passport.authenticate('basic', {session: false}), function (req, res) {
      res.send('You have been authenticated, ' + req.user.name);
  }
);

// end authentication block

app.use('/', router);


app.listen(3000, function () {
  console.log('Successfully started express application!');
});
