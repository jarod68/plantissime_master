module.exports = function(Plant) {
  var WATERING_THRESHOLD = 20;
	
  var onEventCreated = function(err, data) {
        console.log('-- Event created =>', err, data);
  };
  
  Plant.prototype.addMeasure = function(value, measureType) {
    // Measure creation
    var measureToAdd = { 
      value: value,
      type: measureType, 
      time: new Date(), 
      targetId: this.id,
      targetType: 'Plant'
    };

    var targetId = this.id;
    
    // If ground humidity measure, compare with the last value
    if (measureType == 'groundHumidity') {
      this.measures.findOne({ where: { type: measureType }, order: 'time DESC' }, function(err, lastMeasure) {
        //console.log("lastMeasure=>", err, lastMeasure);
        if (lastMeasure != null && value > lastMeasure.value + WATERING_THRESHOLD) {
          // Create event
          Plant.app.models.Event.create({ time: measureToAdd.time, code: 'watering', source: 'addMeasure', level: 1, targetId: targetId, targetType: 'Plant' }, onEventCreated);
        }
      });
    }
    
    this.classification(function(err, classification) {
      //console.log('classification=>', err, classification);
      if(classification != null && classification.recommendationsList != null) {
        var recom;
        for(var i = 0; i < classification.recommendationsList.length; i++) {
          recom = classification.recommendationsList[i];
          //console.log('recom=>', recom);
          
          var alertActive = false;
          if(recom.measureType == measureType) {
            var alertCode;
            // If lower than minimum
            if (recom.type == 'min') {
              alertCode = 'min-'+measureType;
              if (value < recom.value) {
                alertActive = true;
              }
            }
            // If greather than maximum
            else if (recom.type == 'max') {
              alertCode = 'max-'+measureType;
              if (value > recom.value) {
                alertActive = true;
              }
            }
            
            if(alertCode) {
              Plant.app.models.Event.activeAlert(targetId, 'Plant', alertCode, alertActive);
            }
          }
        }
      }
    });
    
    Plant.app.models.Measure.create(measureToAdd, function(err, data) {
      console.log('-- Measure created =>', err, data);
    });
  };
	
};
