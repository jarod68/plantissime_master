planti.controllers.controller('PlantsController', function ($scope, $http) {
  $http.get('/api/plants').success(function(data) {
    $scope.plants = data;
  });
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

planti.controllers.controller('PlantCreateController', function ($scope, $http) {
  $scope.openPlantCreate = function() {
    $http.get('/api/plantclassifications').success(function(data) {
      $scope.plantClasses = data;
      $('#PlantCreateForm').modal('show');
    });
  };
  
  $scope.confirmPlantCreate = function(plant) {
    plant.type = "Plant";
    $http.post('/api/plants', plant).success(function(data) {
      $scope.plants.push(data);
      $('#PlantCreateForm').modal('hide');
      //$('#PlantCreateConfirmation').modal('show');
    });
  };
});