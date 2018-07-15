var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');

var passport = require('passport');

var flash = require('connect-flash');


var morgan = require('morgan');

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

