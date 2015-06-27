planti.controllers.controller('PlantsController', function ($scope, $http) {
  $http.get('/api/plants').success(function(data) {
    $scope.plants = data;
  });
  
  $scope.onPlantCreated = function(plant) {
    if(plant != null) {
      $scope.plants.push(plant);
    }
  };
});

planti.controllers.controller('PlantDetailController', function ($scope, $http, $routeParams, $interval) {
  $http.get('/api/plants/' + $routeParams.plantId + '?filter[include]=classification').success(function(data) {
    $scope.plant = data;
  });
  $http.get('/api/plants/' + $routeParams.plantId + '/events?filter[where][type]=watering&filter[order]=time DESC&filter[limit]=1')
    .success(function(data) {
      $scope.lastWateringEvent = data[0];
  });

  $scope.chart = "groundHumidity";
  $scope.changeChart = function(newChartType) {
    $scope.chart = newChartType;
    console.log(newChartType);
  };

});

