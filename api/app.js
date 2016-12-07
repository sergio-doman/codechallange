// https://blog.risingstack.com/node-js-security-checklist/

var express = require('express');
var helmet = require('helmet');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var csrf = require('csurf');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var routesVersioning = require('express-routes-versioning')();

var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

var config = require('./config');

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
app.use(serveStatic(__dirname + '/public', {'index': ['index.html', 'index.htm']}));


// All routes should be moved to separate file

// Generate csrf token
app.get('/api/form/token', csrfProtection, routesVersioning({
  "1.0.0": function(req, res) {
    res.send(req.csrfToken());
  }
}));

// Create new
app.post('/api/form', parseForm, csrfProtection, routesVersioning({
  "1.0.0": function(req, res) {
    res.send("data is being processed");
  }
}));


app.listen(config.PORT, function () {
  console.log('App started at port ' + config.PORT);
});