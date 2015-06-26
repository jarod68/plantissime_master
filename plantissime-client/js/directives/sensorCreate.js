planti.directives.directive('plantCreate', function() {
  return {
    restrict: 'E',
    scope: {
			buttonDisplay: '=button',
      buttonLabel: '=label',
      callback: '=callback'
    },
    templateUrl: 'views/sensor-create.html'
  };
});