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
  
  $scope.showSensor = function(sensor) {
    $scope.selectedSensor = sensor;
  };
  
  $scope.editSensor = function(sensor) {
    // TODO
  };
  
  $scope.deleteSensor = function(sensor) {
    $http.delete('/api/sensors/'+sensor.id).success(function(data) {
      $scope.selectedSensor = null;
      $scope.sensors.splice($scope.sensors.indexOf(sensor),  1);
      console.log('Sensor ' + sensor.id + ' deleted');
    });
  };
});