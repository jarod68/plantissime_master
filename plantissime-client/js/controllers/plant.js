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