'use strict';

angular.module('myApp.api', [])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.headers.common["accept-version"] = "0.0.1";
}])

.service('api', ['$http', function ($http) {
  this.urlBase = "/api/";

  this.getFormToken = function (cb) {
    $http({
      method: 'GET',
      url: this.urlBase + 'form/token'
    }).then(function successCallback(response) {
      cb(null, response.data);
    }, function errorCallback(response) {
      cb('Failed to load token');
    });
  }

}]);

