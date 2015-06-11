var plantissimeControllers = angular.module('PlantissimeControllers', ["chart.js"]);

plantissimeApp.controller('HomeController', function ($scope) {
  $scope.section = "home";
  $scope.home = true;
});

plantissimeApp.controller('PlantsController', function ($scope, $http) {
  $http.get('/api/plants').success(function(data) {
    $scope.plants = data;
  });
});

plantissimeApp.controller('PlantDetailController', function ($scope, $http, $routeParams, $interval) {
  $http.get('/api/plants/' + $routeParams.plantId + '?filter[include]=classification').success(function(data) {
    $scope.plant = data;
  });
  
  $scope.loadChart = function loadChart(measureType) {
    $http.get('/api/plants/' + $routeParams.plantId + '/measures?filter[where][type]='+measureType).success(function(data) {
      $scope[measureType+"Labels"] = [];
      $scope[measureType+"Series"] = ['Temperature'];
      $scope[measureType+"Data"] = [[]];
      var previousTime = new Date();
      for(var i = 0; i < data.length; i++) {
        if(previousTime.getDate() != new Date(data[i].time).getDate() | (i+1 == data.length)) {
          previousTime = new Date(data[i].time);
          $scope[measureType+"Labels"].push(previousTime.toLocaleDateString());
        }
        else {
          $scope[measureType+"Labels"].push('');
        }
        $scope[measureType+"Data"][0].push(data[i].value);
      }
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
    });
  };
  $interval(function () {
    $scope.loadChart('temperature');
    $scope.loadChart('luminosity');
    $scope.loadChart('airHumidity');
    $scope.loadChart('groundHumidity');
  }, 10000);
});

plantissimeApp.controller('PlantCreateController', function ($scope, $http) {
  $scope.openPlantCreate = function() {
    $http.get('/api/plantclassifications').success(function(data) {
      $scope.plantClasses = data;
      $('#PlantCreateForm').modal('show');
    });
  };
  
  $scope.confirmPlantCreate = function(plant) {
    plant.type = "Plant";
    $http.post('/api/plants', plant).success(function(data) {
      $scope.plants.push(data);
      $('#PlantCreateForm').modal('hide');
      //$('#PlantCreateConfirmation').modal('show');
    });
  };
});

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
    $('#SensorCreateStep1').modal('show');
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