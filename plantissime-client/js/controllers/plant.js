planti.controllers.controller('PlantsController', function ($scope, $http) {
  $http.get('/api/plants?filter[include]=classification').success(function(data) {
    $scope.plants = data;
  });
  
  $scope.onPlantCreated = function(plant) {
    $http.get('/api/plants?filter[include]=classification').success(function(data) {
      $scope.plants = data;
    });
  };
});

planti.controllers.controller('PlantDetailController', function ($scope, $http, $routeParams, $interval, Event) {
  $http.get('/api/plants/' + $routeParams.plantId + '?filter[include]=classification').success(function(data) {
    $scope.plant = data;
  });
  $http.get('/api/events?filter[where][and][0][targetId]=' + $routeParams.plantId + '&filter[and][1][code]=watering&filter[order]=time DESC&filter[limit]=1')
    .success(function(data) {
      $scope.lastWateringEvent = data[0];
  });
  
  Event.find({ filter: { where: { level: 1, targetType: 'Plant', targetId: $routeParams.plantId }, order: "time DESC", limit: 10}}).$promise.then(function(results) {
    console.log(results);
    $scope.events = results;
  });
  Event.find({ filter: { where: { level: 2, targetType: 'Plant', targetId: $routeParams.plantId, expiredAt: null }, order: "time ASC", limit: 10}}).$promise.then(function(results) {
    console.log(results);
    $scope.alerts = results;
  });
  


  $scope.chart = "groundHumidity";
  $scope.changeChart = function(newChartType) {
    $scope.chart = newChartType;
    console.log(newChartType);
  };

});

