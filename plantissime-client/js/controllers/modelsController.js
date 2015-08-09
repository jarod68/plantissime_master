/*  
 *  Plantissime Web Client 
 *
 *  Title       :  ModelsController
 *  Description :	
 *  Year        :  2015
 */
planti.controllers.controller('ModelsController', function ($scope, $http) {
  $scope.loading = true;
  $http.get('/api/sensormodels').success(function(data) {
    $scope.models = data;
    $scope.loading = false;
  });
});
