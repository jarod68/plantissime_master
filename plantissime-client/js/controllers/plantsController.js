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