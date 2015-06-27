planti.directives.directive('sensorCreate', function($http) {
  
  function link ($scope, element, attrs) {
      // Step 1 : Get sensor model
      $scope.sensorCreateStep1 = function() {
        // Initialize
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
          console.log($scope.sensors);
          for(var i = 0; i < $scope.sensorModel.targetsCount; i++) {
            if($scope.selectedTargets[i].id != 0) {
              $http.put('/api/sensors/'+data.id+'/targets/rel/'+$scope.selectedTargets[i].id, {sensorId: data.id, targetId:$scope.selectedTargets[i].id})
                .success(function(data2) {
                  if(data.targets == null) {
                    data.targets = [];
                  }
                  data.targets.push(data2);
                  $scope.callback(data);
                });
            }
          }
          
          $('#SensorCreateStep2').modal('hide');
          if($scope.callback != null) {
            $scope.callback(data);
          }
        });
      };
  }
  
  return {
    restrict: 'E',
    scope: {
			buttonDisplay: '=button',
      label: '=label',
      callback: '=callback'
    },
    link: link,
    templateUrl: 'views/sensor-create.html'
  };
});