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

planti.controllers.controller('PlantDetailController', function ($scope, $http, $routeParams, $interval, Plant, Event) {

  $scope.refresh = function() {
    /*$http.get('/api/plants/' + $routeParams.plantId + '?filter[include]=classification').success(function(data) {
      $scope.plant = data;
    });*/
    $scope.plant = Plant.findById({ id: $routeParams.plantId, filter: { include: 'classification' } });
    
    Event.find({ filter: { where: { level: 1, targetType: 'Plant', targetId: $routeParams.plantId }, order: "time DESC", limit: 10}}).$promise.then(function(results) {
      console.log(results);
      $scope.events = results;
    });
    
    Event.find({ filter: { where: { level: 2, targetType: 'Plant', targetId: $routeParams.plantId, expiredAt: null }, order: "time ASC", limit: 10}}).$promise.then(function(results) {
      console.log(results);
      $scope.alerts = results;
    });
  };

  $scope.chart = "groundHumidity";
  $scope.changeChart = function(newChartType) {
    $scope.chart = newChartType;
    console.log(newChartType);
  };

  $scope.refresh();
});

