const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');





const userSchema = new Schema({
  username: {type:String, required:true},
  password: {type:String, required:true}
});

userSchema.pre('save', function(next){
	var hash = bcrypt.hashSync(this.password, 8);
	this.password = hash;
	next();
});


// restructure this schema to have data as a sub doc

const dateSchema = new Schema([{
  day: {type:Date, required:true, default:Date()},
  number: {type:Number, required:true, default:0}
}]);


const trackerSchema = new Schema({
  activity: {type:String, required:true},

  data: [dateSchema]
});

var User = mongoose.model('User', userSchema);
var Tracker = mongoose.model('Tracker', trackerSchema);

module.exports = {
  User, Tracker
};
