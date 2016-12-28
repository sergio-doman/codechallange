'use strict';

angular.module('myApp.form', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/form', {
    templateUrl: 'views/form.html',
    controller: 'formCtrl'
  });
}])

.controller('formCtrl', ['$scope', function($scope) {

  var model = $scope.model = {

    form: {

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

      register: function () {
        console.log('register !!!');
      },

      reset: function () {
        model.form.data = angular.copy(model.form.dataDefault);
      }
    }

  };


  model.form.reset();

}]);