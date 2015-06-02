var plantissimeApp = angular.module('PlantissimeApp', [
	'ngRoute',
	'PlantissimeControllers'
]);


plantissimeApp.config(['$routeProvider',
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
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);