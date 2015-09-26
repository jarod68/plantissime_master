/*  
 *  Plantissime Web Client 
 *
 *  Title       :  sensorEditForm directive
 *  Description :
 *  Year        :  2015
 */
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