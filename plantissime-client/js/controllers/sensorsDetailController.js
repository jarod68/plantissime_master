/*  
 *  Plantissime Web Client 
 *
 *  Title       :  SensorsDetailController
 *  Description :
 *  Year        :  2015
 */
planti.controllers.controller('SensorsDetailController', function ($scope, $http, $state, $stateParams, Sensor) {
	
	$scope.sensorToShow = Sensor.findById({ id: $stateParams.id, filter: { include: 'targets' } });
	
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
          
						$state.reload();
          });
        }
      }
    });
  };
  
  $scope.deleteSensor = function(sensor) {
    $http.delete('/api/sensors/'+sensor.id).success(function(data) {
      $state.go('settings.sensors', null, { reload: true });
    });
  };
});