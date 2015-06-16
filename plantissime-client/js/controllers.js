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
  $http.get('/api/plants/' + $routeParams.plantId + '/events?filter[where][type]=watering&filter[order]=time DESC&filter[limit]=1')
    .success(function(data) {
      $scope.lastWateringEvent = data[0];
  });
  
  var lastTimes = [];
  var previousTime;
    
  $scope.createChart = function (measureType) {
    $http.get('/api/plants/' + $routeParams.plantId + '/measures?filter[where][type]='+measureType).success(function(data) {
      $scope[measureType+"Labels"] = [];
      $scope[measureType+"Series"] = ['Temperature'];
      $scope[measureType+"Data"] = [[]];
      previousTime = new Date(0);
      lastTimes[measureType] = new Date(0);
      for(var i = 0; i < data.length; i++) {
        if(data[i].time > lastTimes[measureType]) {
          lastTimes[measureType] = data[i].time;
        }
        if(previousTime.getDate() != new Date(data[i].time).getDate() | (i+1==data.length)) {
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
  $scope.createChart('temperature');
  $scope.createChart('luminosity');
  $scope.createChart('airHumidity');
  $scope.createChart('groundHumidity');
  
  /*
  $scope.updateChart = function (measureType) {
    $http.get('/api/plants/' + $routeParams.plantId + '/measures?filter[where][and][0][type]='+measureType+'&filter[where][and][1][time][gt]='+lastTimes[measureType].toJSON()).success(function(data) {
      console.log(data);
      previousTime = lastTimes[measureType];
      for(var i = 0; i < data.length; i++) {
        if(data[i].time > lastTimes[measureType]) {
          lastTimes[measureType] = data[i].time;
        }
        if(previousTime.getDate() != new Date(data[i].time).getDate()) {
          previousTime = new Date(data[i].time);
          $scope[measureType+"Labels"].push(previousTime.toLocaleDateString());
        }
        else {
          $scope[measureType+"Labels"].push('');
        }
        $scope[measureType+"Data"][0].push(data[i].value);
      }
    });
  };
  $interval(function () {
    $scope.updateChart('temperature');
    //$scope.updateChart('luminosity');
    //$scope.updateChart('airHumidity');
    //$scope.updateChart('groundHumidity');
  }, 10000);
  */
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