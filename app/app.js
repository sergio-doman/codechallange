// https://blog.risingstack.com/node-js-security-checklist/

var express = require('express');
var helmet = require('helmet');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var csrf = require('csurf');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var routesVersioning = require('express-routes-versioning')();
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var config = require('./config');

var csrfProtection = csrf({ cookie: true });
// var parseForm = bodyParser.urlencoded({ extended: false });
// var parseJson = bodyParser.json();


// Express
var app = express();
app.use(helmet());
app.set('trust proxy', 1);
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.SESSION_SECRET,
  name: 'sessionId'
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(serveStatic(__dirname + '/public', {'index': ['index.html', 'index.htm']}));
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }

  // handle CSRF token errors here
  res.status(403)
  res.send('form tampered with')
})

// Mongo
var mongooseConnect = function() {
  var options = {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  };
  var connection = mongoose.connect(config.MONGO_URI, options);
  autoIncrement.initialize(connection);
};
mongoose.Promise = global.Promise;
mongooseConnect();
mongoose.connection.on('error', function(err) {
  console.log('Mongoose: ', err);
});
mongoose.connection.on('connect', function(err) {
  console.log('Mongoose connected');
});
mongoose.connection.on('disconnected', function() {
  setTimeout(function () {
    mongooseConnect();
  }, 1000);
});


// Routes
require('./routes')(app, csrfProtection, routesVersioning);


// Start
app.listen(config.PORT, function () {
  console.log('App started at port ' + config.PORT);
});
