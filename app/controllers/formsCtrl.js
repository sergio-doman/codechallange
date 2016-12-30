
var _ = require('lodash');
var async = require('async');
var config = require('../config');
var mongoose = require('mongoose');

var errorCodes = require('../errorCodes');

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
      async.series([

        // Validate params
        function (cb) {
          if ('form' in req.body && 'object' == typeof req.body.form && 'termsAccepted' in req.body) {
            if (req.body.termsAccepted) {
              cb();
            }
            else {
              console.log('Terms not accepted');
              cb({code: 400, msg: errorCodes.e2});
            }
          }
          else {
            console.log('form or termsAccepted not specified');
            cb({code: 400, msg: errorCodes.e1});
          }
        },

        // Check required form fields
        function (cb) {
          var err = false;

          var fields = ['gender', 'firstname', 'lastname', 'email', 'phone', 'age', 'zip'];
          _(fields).forEach(function (field) {
            if (!(field in req.body.form)) {
              err = true;
              return false;
            }
          });

          if (err) {
            console.log('Missing form field');
            cb({code: 400, msg: errorCodes.e1});
          }
          else {
            cb();
          }
        },

        // Check if email is unique
        function (cb) {
          Form.findOne({email: req.body.form.email}).lean().exec(function (err, f) {
            if (err) {
              cb({code: 500, msg: errorCodes.e4});
            }
            else if (f) {
              cb({code: 400, msg: errorCodes.e3});
            }
            else {
              cb();
            }
          });
        },

        // Validate && insert to DB
        function (cb) {
          var form = new Form(req.body.form);

          var validationErrors = form.validateSync();
          if (validationErrors && validationErrors.errors) {

            var e = [];
            _(validationErrors.errors).forEach(function (value, key) {
              e.push(value.message);
            });

            cb({code: 400, msg: e.join("<br />")});
          }
          else {

            form.save(function (err, f) {
              if (err) {
                cb({code: 500, msg: errorCodes.e4});
              }
              else {
                cb(null, f);
              }
            });

          }
        }

      ], function (err, resp) {
          if (err) {
            res.status(err.code).json(err.msg);
          }
          else {

            res.status(200).json({_id: resp[resp.length - 1]._id});
          }

          next();
      });

    }

  }
}

module.exports = Controller;
