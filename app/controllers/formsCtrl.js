
var _ = require('lodash');
var async = require('async');
var config = require('../config');
var mongoose = require('mongoose');
var Form = mongoose.model('Form', require('../models/form').FormSchema);


var Controller = function () {

  return {

    // Generate csrf token
    tokenGenerate: function (req, res, next) {
      res.status(200).json(req.csrfToken());
      next();
    },

    // Create new form
    create: function (req, res, next) {
      res.send("data is being processed");
      next();
    }

  }
}

module.exports = Controller;
