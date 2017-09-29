var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* post users listing. */
router.get('/:number', function(req, res, next) {
  Promise.resolve()
  .then(function(){
    return new Promise(function(resolve, reject){
      var status
      if(req.params.number == 1){
        status = '教務室';
      }else if(req.params.number == 2){
        status = '教室';
      }else if(req.params.number == 3){
        status = 'その他';
      }else if(req.params.number == 4){
        status = '研究室';
      }else if(req.params.number == 5){
        status = '外出';
      }
      resolve(status);
    });
  })
  .then(function(value){
    return new Promise(function(resolve, reject){

          var date = new Date();
          var month = date.getMonth();
          var day = date.getDate();
          var hour = date.getHours();
          var minutes = date.getMinutes();
          var now =  month+"月"+day+"日"+hour+"時"+minutes+"分"
      User.update({ id: req.session.user_id }, { $set: {status: value, now: now}},{ upsert: false},
       function(err) {
         if(err) {
           console.log(err);
           reject(error);
         } else {
           console.log("update success.");
           resolve();
         }
       });
    });
  })
  .then(function(value){
    User.findOne({ id: req.session.user_id},function(err, user){
      if(err){
        console.log(err);
        reject('error');
      }
      else{
        console.log(user);
        res.render('now',{user: user});
      }
      });
  }).catch(function(error){
    console.log(error);
  });




});

module.exports = router;
