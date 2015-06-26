planti.directives.directive('plantCreate', function() {
  return {
    restrict: 'E',
    scope: {
      buttonLabel: '=label',
      callback: '=callback'
    },
    templateUrl: 'views/plant-create.html'
  };
});