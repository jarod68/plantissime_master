planti.controllers.controller('SettingsController', function ($scope, $http) {
  $scope.loading = true;
  
  $scope.goDevices = function() {
    $scope.tab = 'devices';
    $scope.view = 'views/sensor-list.html';
  };
  
  $scope.goSpecies = function() {
    $scope.tab = 'species';
    $scope.view = 'views/specie-list.html';
  };
  
  // Default tab
  $scope.goDevices();
});
