var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

//modelの定義
var db = require('./model/database');
// contorllerの定義
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var teacher = require('./routes/teacher');
var update = require('./routes/update');
var now = require('./routes/now');
var sessionMiddleware = session({
  secret: 'mallow',
  resave: false,
  saveUninitialized: false,
  cookie:{
  httpOnly: false,
  secure: false,
  maxage: 1000 * 60 * 30
}});


app.session = sessionMiddleware;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessionMiddleware);



app.use('/login',login);
app.use('/teacher',teacher);
app.use(function(req, res, next){
  console.log(req.session.user_id);
  if(req.session.user_id){
    next();
  }else{
    res.redirect('login');
  }
});
app.use('/',index);
app.use('/addUser',users);
app.use('/update',update);
app.use('/now',now);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
