// Sensors List
plantissimeApp.controller('SensorsController', function ($scope, $http) {
  
  $http.get('/api/sensors?filter[include]=targets').success(function(data) {
    $scope.sensors = data;
  });
  
});

// Sensor Create
plantissimeApp.controller('SensorCreateController', function ($scope, $http) {
  // Step 1 : Get sensor model
  $scope.sensorCreateStep1 = function() {
    $scope.sensor = null;
    $scope.sensorModel = null;
    $http.get('/api/sensormodels').
      success(function(data) {
        $scope.sensorModels = data;
        $('#SensorCreateStep1').modal('show');
      }).
      error(function(data, status, headers, config) {
        $scope.error = data.error;
        $('#SensorCreateError').modal('show');
      });
  };
  
  // Step 2 : Get specific sensor data
  $scope.sensorCreateStep2 = function() {
    $('#SensorCreateStep1').modal('hide');
    $http.get('/api/sensormodels/model/'+$scope.sensor.modelNumber).
      success(function(data) {
        $scope.sensorModel = data;
        // Initialize table id
        $scope.selectedTargets = new Array();
        for(var i = 0; i < $scope.sensorModel.targetsCount; i++)
        {
          $scope.selectedTargets.push({id:"0"});
        }
        // Get possible targets
        $http.get('/api/'+$scope.sensorModel.targetsType+'s').success(function(data) {
          $scope.targets = data;
        });
        $('#SensorCreateStep2').modal('show');
      }).
      error(function(data, status, headers, config) {
        $scope.error = data.error;
        $('#SensorCreateError').modal('show');
      });
  };
  
  // Step 3 : Create
  $scope.sensorCreateStep3 = function() {

    
    $http.post('/api/sensors', $scope.sensor).success(function(data) {
      $scope.sensors.push(data);
      
      for(var i = 0; i < $scope.sensorModel.targetsCount; i++) {
        if($scope.selectedTargets[i].id != 0) {
          $http.put('/api/sensors/'+data.id+'/targets/rel/'+$scope.selectedTargets[i].id, {sensorId: data.id, targetId:$scope.selectedTargets[i].id});
        }
      }
      
      $('#SensorCreateStep2').modal('hide');
    });
  };
  
  $http.get('/api/plants').success(function(data) {
    $scope.plants = data;
  });
});