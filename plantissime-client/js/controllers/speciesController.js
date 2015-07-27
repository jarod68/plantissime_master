// Species List
planti.controllers.controller('SpeciesController', function ($scope, $http) {
  $scope.loading = true;
  $http.get('/api/plantclassifications').success(function(data) {
    $scope.classifications = data;
    $scope.loading = false;
  });
});