// Sensors List
planti.controllers.controller('SensorsController', function ($scope, $http) {
  var loadSensors = function() {
    $http.get('/api/sensors?filter[include]=targets').success(function(data) {
      $scope.sensors = data;
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

// Sensor Create
planti.controllers.controller('SensorCreateController', function ($scope, $http) {
  

});