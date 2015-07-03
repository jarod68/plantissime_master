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
        
        // Add measures
        $http.get('/api/plants/' + scope.plantId + '/measures?filter[where][and][0][type]=' + scope.measureType + '&filter[where][and][1][time][gt]=' + date.toJSON()).success(function(data) {
          scope.chartLabels = [];
          scope.chartSeries = [scope.measureType];
          scope.chartData = [[]];
          scope.chartColours = [];
          scope.chartTimes = [];
          var previousTime = new Date(0);
          scope.isEmpty = true;
          // For each measures
          for(var i = 0; i < data.length; i++) {
            
            scope.chartTimes.push(new Date(data[i].time).toLocaleString());
            
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
          // Add color
          scope.chartColours.push('#4D5360');
          
          // Add recommendations
          if(scope.recommendations != null) {
            for(var i = 0; i < scope.recommendations.length; i++) {
              if(scope.recommendations[i].measureType == scope.measureType) {
                scope.chartSeries.push(scope.recommendations[i].type + ' recommendation');
                var recData = [];
                for(var j = 0; j < scope.chartData[0].length; j++) {
                  recData.push(scope.recommendations[i].value);
                }
                scope.chartData.push(recData);
                
                // Add color
                switch (scope.recommendations[i].type) {
                  case "min":
                  case "max":
                    scope.chartColours.push('#F7464A');
                    break;
                    
                  case "average":
                    scope.chartColours.push('#46BFBD');
                    break;
                
                  default:
                    break;
                }
              }
            }
          }
          
          console.log(scope.chartColours);
          
          scope.chartTooltips = function(tooltip) {
            console.log(tooltip);
            $('#chart-tooltip').popup({
              title   : 'Popup Title',
              content : 'Hello I am a popup'
            });
            if (!tooltip) {
              
            }
            
          };
          
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
      period: '=period',
      recommendations: '=recommendations'
    },
    link: link,
    templateUrl: 'views/plant-chart.html'
  };
});