/*  
 *  Plantissime Web Client 
 *
 *  Title       :  plChart directive
 *  Description :
 *  Year        :  2015
 */
planti.directives.directive('plChart', function($http) {

  function link (scope, element, attrs) {
    console.log(scope);
    scope.changePeriod = function (newPeriod) {
      scope.period = newPeriod;
    }
    
    scope.$watchGroup(['targetType', 'targetId', 'measureType', 'period'], function () {
      scope.loading = true;
  		console.log(scope.targetId);
      if(scope.targetId != null && scope.targetType != null) {
        scope.key = 'chart' + scope.targetType + '' + scope.targetId + '' + scope.measureType + '' + scope.period;
        console.log(scope.key);
        
        var date = new Date();
        switch (scope.period) {
          case 'week':
            date.setDate(date.getDate()-7);
            break;
          case 'month':
            date.setMonth(date.getMonth()-1);
            break;   
        
          default:
            break;
        }
        
        // Add measures
        $http.get('/api/' + scope.targetType + 's/' + scope.targetId + '/measures?filter[where][and][0][type]=' + scope.measureType + '&filter[where][and][1][time][gt]=' + date.toJSON()).success(function(data) {
          console.log(data);
          scope.chartLabels = [];
          scope.chartSeries = [scope.measureType];
          scope.chartData = [[]];
  				
          scope.isEmpty = true;
          // For each measures
          for(var i = 0; i < data.length; i++) {
            
            // Add day as label
            scope.chartLabels.push(new Date(data[i].time).toLocaleString());
  
            // Add value
            scope.chartData[0].push(data[i].value);
            
            scope.isEmpty = false;
          }
          
          console.log(scope);
          
          scope.onClick = function (points, evt) {
            console.log(points, evt);
          };
          
          scope.loading = false;
        });  
      }  
    });
  }
  
  return {
    restrict: 'E',
    scope: {
			targetType: '=targetType',
			targetId: '=targetId',
      measureType: '=type',
      period: '=period'
    },
    link: link,
    templateUrl: 'views/pl-chart.html'
  };
});