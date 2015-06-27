planti.directives.directive('plantChart', function($http) {


  function link (scope, element, attrs) {
    
    scope.changePeriod = function (newPeriod) {
      scope.period = newPeriod;
    }
    
    scope.$watchGroup(['plantId', 'measureType', 'period'], function () {
      scope.loading = true;
      if(scope.plantId != null) {
        scope.key = 'chart' + scope.plantId + '' + scope.measureType + '' + scope.period;
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
        
        
        $http.get('/api/plants/' + scope.plantId + '/measures?filter[where][and][0][type]=' + scope.measureType + '&filter[where][and][1][time][gt]=' + date.toJSON()).success(function(data) {
          scope.chartLabels = [];
          scope.chartSeries = [scope.measureType];
          scope.chartData = [[]];
          var previousTime = new Date(0);
          scope.isEmpty = true;
          // For each measures
          for(var i = 0; i < data.length; i++) {
            
            scope.isEmpty = false;
            
            // If new day
            if(previousTime.getDate() != new Date(data[i].time).getDate() | (i+1==data.length)) {
              
              previousTime = new Date(data[i].time);
              // Add day as label
              scope.chartLabels.push(previousTime.toLocaleDateString());
            }
            else {
              // Add a blank label
              scope.chartLabels.push('');
            }
            
            // Add value
            scope.chartData[0].push(data[i].value);
          }
          
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
			plantId: '=plant',
      measureType: '=type',
      period: '=period'
    },
    link: link,
    templateUrl: 'views/plant-chart.html'
  };
});