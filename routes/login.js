var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
/*  get method */
router.get('/', function(req, res, next) {
  res.render('login');
  console.log('ok');
});

/* post method */
router.post('/',function(req,res,next){
//  passport.authenticate("local",{session:false,successRedirect:'/',failureRedirect:'/login'});
//});
  var Users = mongoose.model('User');
  var id = req.body.id;
  var pass = req.body.password;
  Users.findOne({ "id": id},function(err, user){
    if(err){
      console.log(err);
    }
    else{
      if(user.password === pass){
      req.session.user_id = id;
      res.render('now',{user: user});
    }
      else{
      res.render('login');
    }
    }
  });
});

module.exports = router;
