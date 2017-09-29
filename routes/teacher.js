var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({},function(err,data){
    for(var i=0;i<data.length;i++){
      console.log(data[i]);
    }
      res.render('teacher',{data:data,session:req.session.user_id});
  })

});

module.exports = router;
