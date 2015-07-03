planti.controllers.controller('HomeController', function ($scope, $http, $interval) {
  $scope.section = "home";
  $scope.home = true;
  
  $scope.currentDate = new Date();
  
  $interval(function() {
    $scope.currentDate = new Date();
  }, 1000);
  
  $http.get('/api/events?filter[where][level]=1&filter[order]=time DESC&filter[limit]=10&filter[include]=target')
    .success(function(data) {
      $scope.events = data;
      console.log(data);
  });  
  $http.get('/api/events?filter[where][and][0][level]=2&filter[where][and][1][expiredAt]=null&filter[order]=time DESC&filter[limit]=10&filter[include]=target')
    .success(function(data) {
      $scope.alerts = data;
  });
});