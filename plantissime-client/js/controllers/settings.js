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
planti.controllers.controller('SensorsController', function ($scope, $http, Sensor) {
  var loadSensors = function() {
    $scope.loading = true;
    
    var date = new Date()
    date.setDate(date.getDate()-7);
    //Sensor.find({ filter: { include: ['targets', { relation: 'measures', scope: { where: { type: 'power' } } }] } }).$promise.then(function(results) {
    Sensor.find({ filter: { include: 'targets' } }).$promise.then(function(results) {
      console.log(results);
      $scope.sensors = results;
      $scope.loading = false;
    });
  };
  
  $scope.enablePowerChart = function() {
    $('.ui.accordion').accordion();
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