// notes from RESTful API using Node, Express aand MongoDB video

// in mongo:

db.createCollection('genres')

db.genres.insert({name:''})

//

make genre schema

// app.js:

app.get('/api/genres', function(req, res){

	// get genres function

	res.json(genres)
})

app.get('/api/books/:id', function(req, res){
	req.params._id
})

app.post('/api/genres', function(req, res){
	req.body
})

//
// this goes inside the app.js
//


// amy's code:
passport.use(new BasicStrategy(
	function(username, passport, done) {
		User.findOne( {name: username}, function(err, user){
			if (user && bcrypt.compareSync(password, user.password)){
				return done(null, user);
			}
			return done(null, false);
		});
	}
))

// alt version from documentation that Geoff posted, doesn't deal with bcrypt yet:
passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

app.use(passport.authenticate('basic', {session: false}));

app.get('/api/auth' function(req, res){
	res.json( {
		data: [{ key: 'value'}]
	})
});


//
// encryption, goes inside the model
//

const bcrypt = require(bcryptjs)

//.pre is a before hook

userSchema.pre('save', function(next){
	var hash = bcrypt.hashSync(this.password, 8);
	this.password = hash;
	next();
})


// building db

db.trackers.insertOne({
	"activity": "Test activity",
	"data": [{
		"day": Date(),
		"number": 3
	}]
})
