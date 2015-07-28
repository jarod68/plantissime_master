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
    $scope.sensorToShow = sensor;
  };
  
  $scope.editSensor = function(sensor) {
    $scope.sensorToEdit = angular.copy(sensor);
    $http.get('/api/sensormodels/model/'+$scope.sensorToEdit.modelNumber).success(function(modelData) {
      $scope.sensorToEditModel = modelData;
      $http.get('/api/'+$scope.sensorToEditModel.targetsType+'s').success(function(targetsData) {
        $scope.sensorToEditTargets = targetsData;
        for (var i = 0; i < $scope.sensorToEdit.targets.length; i++) {
          for(var j = 0; j < $scope.sensorToEditTargets.length; j++) {
            if ($scope.sensorToEditTargets[j].id == $scope.sensorToEdit.targets[i].id) {
              $scope.sensorToEdit.targets[i] = $scope.sensorToEditTargets[j];
              console.log("match!");
              break;
            }
          }
        }
        console.log($scope.sensorToEdit, $scope.sensorToEditModel, $scope.sensorToEditTargets);
        $('#SensorEditModal').modal('show');
      });
    });
  };
  
  $scope.editSensorConfirm = function() {
    $('#SensorEditModal').modal('hide');
    $http.delete('/api/sensors/'+$scope.sensorToEdit.id+'/targets').success(function(modelData) {
      for (var i = 0; i < $scope.sensorToEdit.targets.length; i++) {
        if($scope.sensorToEdit.targets[i] != null) {
          $http.put('/api/sensors/'+$scope.sensorToEdit.id+'/targets/rel/'+$scope.sensorToEdit.targets[i].id).success(function(modelData) {
          
          });
        }
      }
    });
  };
  
  $scope.deleteSensor = function(sensor) {
    $http.delete('/api/sensors/'+sensor.id).success(function(data) {
      $scope.sensorToShow = null;
      $scope.sensors.splice($scope.sensors.indexOf(sensor),  1);
      console.log('Sensor ' + sensor.id + ' deleted');
    });
  };
});