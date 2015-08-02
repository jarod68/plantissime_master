/*  
 *  Plantissime Web Client 
 *
 *  Title       :  PlantDetailController
 *  Description :
 *  Year        :  2015
 */
planti.controllers.controller('PlantDetailController', function ($scope, $http, $routeParams, $interval, Plant, Event) {

  // Function to load/reload plant data
  $scope.refresh = function() {
    // Load plant data  
    $scope.plant = Plant.findById({ id: $routeParams.plantId, filter: { include: 'classification' } });
    
    // Load events
    Event.find({ filter: { where: { level: 1, targetType: 'Plant', targetId: $routeParams.plantId }, order: "time DESC", limit: 10}}).$promise.then(function(results) {
      console.log(results);
      $scope.events = results;
    });
    
    // Load alerts
    Event.find({ filter: { where: { level: 2, targetType: 'Plant', targetId: $routeParams.plantId, expiredAt: null }, order: "time ASC", limit: 10}}).$promise.then(function(results) {
      console.log(results);
      $scope.alerts = results;
    });
  };

  // Set default chart
  $scope.chart = "groundHumidity";
  
  $scope.changeChart = function(newChartType) {
    $scope.chart = newChartType;
    console.log(newChartType);
  };

  $scope.refresh();
});
