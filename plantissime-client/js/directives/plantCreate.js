/*  
 *  Plantissime Web Client 
 *
 *  Title       :  plantCreate directive
 *  Description :
 *  Year        :  2015
 */
planti.directives.directive('plantCreate', function($http) {

  function link (scope, element, attrs) {
     
    scope.openModal = function() {
      scope.plant = null;
      $http.get('/api/plantclassifications').success(function(data) {
        console.log(data);
        scope.plantClasses = data;
        $('#PlantCreateForm').modal('show');
      });
    };
    
    scope.confirmCreate = function(plant) {
      plant.type = "Plant";
      $http.post('/api/plants', plant).success(function(data) {
        $('#PlantCreateForm').modal('hide');
        scope.callback(data);
        scope.plant = null;
        scope.plantClasses = null;
      });
    };
    
    scope.cancelCreate = function() {
      console.log('cancelCreate');
      scope.plant = null;
      scope.plantClasses = null;
      scope.callback(null);
    };
  }
  
  return {
    restrict: 'E',
    scope: {
      buttonLabel: '=label',
      callback: '=callback'
    },
    link: link,
    templateUrl: 'views/plant-create.html'
  };
});