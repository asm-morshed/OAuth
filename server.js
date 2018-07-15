var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');

var passport = require('passport');

var flash = require('connect-flash');
//The flash is a special area of the session used for storing messages. 
//Messages are written to the flash and cleared after being displayed to the use

var morgan = require('morgan');
//HTTP request logger middleware for node.js


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var configDB = require('./config/database');



mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

//For passport  
app.use(session({secret:'asmmorshed'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//load all routes and pass it to app and fully configured passport
require('./app/routes.js')(app,passport);

app.listen(port,()=>{
    console.log("server is working on port: ", port);
});

