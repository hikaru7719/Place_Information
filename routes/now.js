var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
/*  get method */
router.get('/',function(req,res,next){
  var Users = mongoose.model('User');
  Users.findOne({ "id": req.session.user_id},function(err, user){
    if(err){
      console.log(err);
    }
    else{
      res.render('now',{user: user});
    }
  });
});

module.exports = router;
