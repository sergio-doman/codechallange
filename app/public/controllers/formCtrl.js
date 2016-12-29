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
        zip: "",
        termsAccepted: false
      },

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
        $timeout(function () {

          model.form.progress = false;
          model.form.sent = true;

          // toastr.error('Error');
          // toastr.success('Registered');
          toastr.info('Registered');
        }, 2000);

      },

      reset: function () {
        model.form.data = angular.copy(model.form.dataDefault);
      }
    }

  };


  model.form.reset();
  model.form.getToken();

}]);