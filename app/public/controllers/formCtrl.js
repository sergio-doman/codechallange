'use strict';

angular.module('myApp.form', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/form', {
    templateUrl: 'views/form.html',
    controller: 'formCtrl'
  });
}])

.controller('formCtrl', [function() {

}]);