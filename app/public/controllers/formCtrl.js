'use strict';

angular.module('myApp.form', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/form', {
    templateUrl: 'views/form.html',
    controller: 'formCtrl'
  });
}])

.controller('formCtrl', ['$scope', '$timeout', 'toastr', 'api', function($scope, $timeout, toastr, api) {

  var model = $scope.model = {

    form: {
      token: "",
      sent: false,
      progress: false,

      dataDefault: {
        gender: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        age: "",
        zip: ""
      },

      termsAccepted: false,

      data: {},

      getToken: function () {
        api.getFormToken(function (err, token) {
          if (err) {
            toastr.error(err);
          }
          else {
            model.form.token = token;
          }
        });
      },

      register: function () {
        model.form.progress = true;

        api.postRegistrationForm({
          form: model.form.data,
          termsAccepted: model.form.termsAccepted
        }, model.form.token, function (err) {

          // Timeout added in test purposes only..
          $timeout(function () {

            model.form.progress = false;
            if (err) {
              toastr.error(err);
            }
            else {
              model.form.sent = true;
              model.form.reset();
              toastr.info('Registered');
            }

          }, 1000);

        });

      },

      reset: function () {
        model.form.data = angular.copy(model.form.dataDefault);
        model.form.termsAccepted = false;
      }
    }

  };


  model.form.reset();
  model.form.getToken();

}]);