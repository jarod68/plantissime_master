planti.directives.directive('plantEdit', function($http, Plant) {

  function link (scope, element, attrs) {

    scope.actionOpen = function() {
      console.log('plantEdit', 'actionOpen', scope.plant);
      scope.plant = null;
      scope.isNewPlant = true;
      if(scope.plantModel != null) {
        scope.isNewPlant = false;
        scope.plant = angular.copy(scope.plantModel, scope.plant);
      }
      
      $http.get('/api/plantclassifications').success(function(data) {
        console.log('scope.plantClasses', data);
        scope.plantClasses = data;
        $('#PlantEditForm').modal('show');
      });
    };
    
    scope.actionConfirm = function(plant) {
      console.log('plantEdit', 'actionConfirm');
      if(scope.isNewPlant) {
        plant.type = "Plant";
        $http.post('/api/plants', plant).success(function(data) {
          $('#PlantEditForm').modal('hide');
          if(scope.callback) {
            scope.callback(data);
          }
        });
      }
      else {
        $http.put('/api/plants/'+plant.id, plant).success(function(data) {
          $('#PlantEditForm').modal('hide');
          if(scope.callback) {
            scope.callback(data);
          }
        });
      }
    };
    
    scope.actionCancel = function() {
      console.log('plantEdit', 'actionCancel', scope.plant, scope.plantClasses, scope.backup);
      scope.plant = scope.backup;
      scope.plantClasses = null;
      if(scope.callback) {
        scope.callback(null);
      }
    };
    
    $('#'+scope.onClickId).click(scope.actionOpen);
  }
  
  return {
    restrict: 'E',
    scope: {
      callback: '=?callback',
      plantModel: '=plantModel',
      onClickId: '=onClickId'
    },
    link: link,
    templateUrl: 'views/plant-edit.html'
  };
});