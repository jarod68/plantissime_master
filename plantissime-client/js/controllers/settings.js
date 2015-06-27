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

// Sensors List
planti.controllers.controller('SensorsController', function ($scope, $http) {
  var loadSensors = function() {
    $scope.loading = true;
    $http.get('/api/sensors?filter[include]=targets').success(function(data) {
      $scope.sensors = data;
      $scope.loading = false;
    });
  };
  
  loadSensors();
  
  $scope.onSensorCreated = function(sensor) {
    loadSensors();
  };
  
  $scope.sensorDelete = function(sensor) {
    $http.delete('/api/sensors/'+sensor.id).success(function(data) {
      $scope.sensors.splice($scope.sensors.indexOf(sensor),  1);
      console.log('Sensor ' + sensor.id + ' deleted');
    });
  };
});

// Species List
planti.controllers.controller('SpeciesController', function ($scope, $http) {
  $scope.loading = true;
  $http.get('/api/plantclassifications').success(function(data) {
    $scope.classifications = data;
    $scope.loading = false;
  });
});