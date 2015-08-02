/*  
 *  Plantissime Web Client 
 *
 *  Title       :  Plantissime Application
 *  Description : 
 *  Year        :  2015
 */
var app = angular.module('PlantissimeApp', [
	'ngRoute',
	'planti.controllers',
	'planti.directives',
  'planti.services',
  'planti.filters',
  'lbServices'
]);

// Namespaces
var planti = {};
planti.controllers = angular.module('planti.controllers', ["chart.js"]);
planti.directives = angular.module('planti.directives', []);
planti.services = angular.module('planti.services', ['ngResource']);
planti.filters = angular.module('planti.filters', []);

// Routing
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      }).
      when('/plants', {
        templateUrl: 'views/plant-list.html',
        controller: 'PlantsController'
      }).
      when('/plants/:plantId', {
        templateUrl: 'views/plant-detail.html',
        controller: 'PlantDetailController'
      }).
      when('/sensors', {
        templateUrl: 'views/sensor-list.html',
        controller: 'SensorsController'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);