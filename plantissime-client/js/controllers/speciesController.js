/*  
 *  Plantissime Web Client 
 *
 *  Title       :  SpeciesController
 *  Description :
 *  Year        :  2015
 */
planti.controllers.controller('SpeciesController', function ($scope, $http) {
  $scope.loading = true;
  $http.get('/api/plantclassifications').success(function(data) {
    $scope.classifications = data;
    $scope.loading = false;
  });
});