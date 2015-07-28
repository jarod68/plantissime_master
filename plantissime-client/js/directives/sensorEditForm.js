planti.directives.directive('sensorEditForm', function($http) {
  
  return {
    restrict: 'E',
    scope: {
			sensor: '=sensor',
      targets: '=targets',
      model: '=model'
    },
    templateUrl: 'views/sensor-edit-form.html'
  };
});