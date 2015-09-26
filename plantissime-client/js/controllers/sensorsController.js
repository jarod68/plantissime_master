/*  
 *  Plantissime Web Client 
 *
 *  Title       :  SensorsController
 *  Description :
 *  Year        :  2015
 */
planti.controllers.controller('SensorsController', function ($scope, $http, $state, Sensor) {
  var loadSensors = function() {
    $scope.loading = true;
		$scope.$state = $state;
    
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
		$state.go('settings.sensors.detail', {  id: sensor.id })
  };
  

});