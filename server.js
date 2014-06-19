var mongoose 	 = require('mongoose');
var express 	 = require("express");
var session 	 = require('express-session');
var winston 	 = require('winston');
var bodyParser 	 = require('body-parser');
var cookieParser = require('cookie-parser');


// express 
var app = express();
var carAPI = require("./cars.js");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var api = carAPI();


// app usage
app.use(cookieParser()) 
app.use(bodyParser());
app.use(passport.initialize());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.session());


app.get('/cars', function(req, res){
	//res.send('users');
	// call to the awesome api
	return api.list(req,res);
});
var
port = 3000;
winston.info('Connected on localhost port :%s', port);
app.listen(port);
