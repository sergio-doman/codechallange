'use strict';

angular.module('myApp', [
  'ngRoute',
  'toastr',
  'myApp.main',
  'myApp.form'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/main'});
}]);
