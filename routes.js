const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const models = require('./models/tracker')
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));



// Show a list of all activities I am tracking, and links to their individual pages:
// Works as expected, shows json
router.get('/api/activities', function(req, res){

  models.Tracker.find({}).then(function(activity){
    res.json(
      activity
    )
  }).catch(function(err){
    return console.log("Error at router.get /api/activites" + err)
  })

});


//	Create a new activity for me to track
//  Works as expected in Postman with json sent as req.body
router.post('/api/activities', function(req, res, next){

  console.log("submitted post in req.body is: " + req.body.activity);

  let newActivity = new models.Tracker({
    activity: req.body.activity,
  });
  newActivity.save().then(function(activity) {
    console.log("New activiy saved by post /api/activites");
  }).catch(function(err){
    console.log("Error saving activity by post /api/activites" + err)
  })

  next();

});


// Show information about one activity I am tracking, and give me the data I have recorded for that activity.
// Works as expected with :id paramater sent
router.get('/api/activities/:id', function(req, res){
  let activityId = req.params.id;
  models.Tracker.findOne({"_id":activityId}).then(function(activity){
    res.json(
      activity
    )
  }).catch(function(err){
    return console.log("Error at router.get /api/activites/:id" + err)
  });


});

// Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.
// Worked in Postman with json as req.body, renamed the activity field of a document
router.put('/api/activities/:id', function(req, res, next){
  let activityId = req.params.id;

  models.Tracker.update({"_id": activityId},
  { activity:req.body.activity, description:req.body.description }, function(err, raw){
    if(err){
      console.log("Error updating attributes at PUT /api/activites/:id " + err + JSON.stringify(raw))
    }
  });
  next();
});


// Delete one activity I am tracking. This should remove tracked data for that activity as well.
// Worked in Postman, removed a document from my db
router.delete('/api/activities/:id', function(req, res, next){
  let activityId = req.params.id;

  models.Tracker.remove({"_id": activityId},
  function(err){
    if(err){
      console.log("Error deleting item at DELETE /api/activities/:id " + err)
    }
  });
  next()
});


// Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.

// Completely lost on this one
router.post('/api/activities/:id/stats', function(req, res, next){
  let activityId = req.params.id;
  // console.log("req.body.day is: " + req.body.day);
  // console.log("req.body.number is: " + req.body.number);
  //
  // models.Tracker.findByIdAndUpdate(activityId,
  //   { "$push" : { "data": {day: req.body.day}}},
  //
  // )


  // models.Tracker.data.update({"_id": activityId},
  // {
  //   day: req.body.day,
  //   number: req.body.number
  //
  // });

  // models.Tracker.findById(activityId, function(err, activity){
  //   if (err) return console.log("Error at POST /api/activites/:id/stats " + err);
    // activity.data = {
    //   number: req.body.number
    // };
//     activity.data.update(
//
//     )
//     activity.save(function(err, updatedActivity) {
//       if (err) return console.log("Error updating at POST /api/activities/:id/stats " + err);
//       console.log("updatedActivity " + updatedActivity);
//     });
//   });
//  next();

});


// 	Remove tracked data for a day.
//  This works intermittedly :(  
router.delete('/api/stats/:id', function(req, res, next){
  let activityId = req.params.id;
  // models.Tracker.data.update({"_id":activityId}).then(function(result){
  //   console.log(result.data);
  //   result.data.pull();
  //   result.save();
  // }).catch(function(err){
  //   console.log("Error at DELETE /api/stats/:id " + err);
  // });
  models.Tracker.findById(activityId, function(err, activity){
    if (err) return console.log("Error at DELETE /api/stats/:id " + err);
    console.log("activity.data " + activity.data);
    activity.data = [];
    activity.save(function(err, updatedActivity) {
      if (err) return console.log("Error updating at DELETE /api/stats/:id " + err);
      console.log("updatedActivity " + updatedActivity);
    });
  });
  next();
});

module.exports = router;
