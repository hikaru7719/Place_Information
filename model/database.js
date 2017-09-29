var mongoose = require('mongoose');

var mURI='mongodb://localhost:27017/Teacher';
mongoose.connect(mURI,function(err){
  if(err){
    console.log(err);
  }
});



var UserSchema = new mongoose.Schema({
  id: {type: String, index: {unique: true }},
  name: String,
  password: String,
  now: {type: String, default: function(){
    var date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    return month+"月"+day+"日"+hour+"時"+minutes+"分"
  }},
  status: {type: String ,default: "教務室"}
},{
  versionKey: false
});
mongoose.model('User',UserSchema);
