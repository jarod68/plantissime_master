planti.directives.directive('plantChart', function($http, $filter) {

  function link (scope, element, attrs) {
    
    scope.changePeriod = function (newPeriod) {
      scope.period = newPeriod;
    }
    scope.changeChart = function (newPeriod, newStyle) {
      scope.period = newPeriod;
      scope.style = newStyle;
    }
    
    scope.$watchGroup(['plantId', 'measureType', 'period', 'style'], function () {
      scope.loading = true;
      scope.isEmpty = true;
      if(scope.plantId != null) {
        scope.key = 'chart' + scope.plantId + '' + scope.measureType + '' + scope.period;
        console.log(scope.key);
        
        var date = new Date();

        if(scope.style == 'line') {
          console.log('LINE');
          switch (scope.period) {
           case 'day':
              date.setDate(date.getDate()-1);
              break;   
              
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
            
            // For each measures
            for(var i = 0; i < data.length; i++) {
              
              scope.chartTimes.push(new Date(data[i].time).toLocaleString());
              
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
              
              scope.isEmpty = false;
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
              scope.onClick = function (points, evt) {
                console.log(points, evt);
              };
              
              scope.loading = false;
            });  
          }
          else if(scope.style == 'bar') {
            
            console.log('BAR');
            var by = 'day';
            var end = new Date();
            switch (scope.period) {
              case 'day':
                by = 'hour';
                date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
                break;   
              case 'week':
                by = 'day';
                date = new Date(date.getFullYear(), date.getMonth(), date.getDate()-7, 0, 0, 0, 0);
                break;
              case 'month':
                by = 'day';
                date = new Date(date.getFullYear(), date.getMonth()-1, 0, 0, 0, 0, 0);
                break;   
            
              default:
                break;
            }
            // Add averages
            $http.get('/api/plants/' + scope.plantId + '/averages?type=' + scope.measureType + '&since=' + date.toJSON()+'&by=' + by).success(function(averages) {
              var byDate = [];
              for (var index = 0; index < averages.length; index++) {
                var average = averages[index];
                switch (by) {
                  case 'hour':
                    byDate[$filter('date')(average.date, 'MMM d, h a')] = average.value;
                    break;
                
                  case 'day':
                    byDate[$filter('date')(average.date, 'MMM d')] = average.value;
                    break;
                
                  default:
                    break;
                }
                
                scope.isEmpty = false;
              }
              
              
              scope.chartLabels = [];
              scope.chartSeries = [scope.measureType];
              scope.chartData = [[]];
              var label = "";
              while(date <= end) {
                switch (by) {
                  case 'hour':
                    date.setHours(date.getHours()+1);
                    label = $filter('date')(date, 'MMM d, h');
                    break;
                  case 'day':
                    date.setDate(date.getDate()+1);
                    label = $filter('date')(date, 'MMM d');
                    break;
                }
                if(byDate[label] == null) {
                  scope.chartData[0].push(0);
                }
                else {
                  scope.chartData[0].push(byDate[label]);
                }
                scope.chartLabels.push(label);
              }
             
              scope.loading = false;
            });
          }
          
          console.log(scope.chartColours);
      }  
    });
  }
  
  return {
    restrict: 'E',
    scope: {
			plantId: '=plant',
      measureType: '=type',
      period: '=period',
      style: '=style',
      recommendations: '=recommendations'
    },
    link: link,
    templateUrl: 'views/plant-chart.html'
  };
});