module.exports = function(Plant) {
  var WATERING_THRESHOLD = 20;
	
  var onEventCreated = function(err, data) {
        console.log('-- Event created --');
        console.log(err);
        console.log(data);
        console.log('---------------------');
  };
  
  var activeAlert = function(targetId, alertCode, alertActive) {
    console.log('activeAlert', targetId, alertCode, alertActive);
    
    // Search an active alert
    Plant.app.models.Event.findOne({ where: { targetId: targetId, code: alertCode, expiredAt: null }, order: 'time DESC' }, function(err, currentAlert) {
      console.log('-- Current Alert ==>', err, currentAlert);
      // If no active alert or alert expired and we must active one
      if ((currentAlert == null || currentAlert.expiredAt < new Date()) && alertActive) {
        // Create an active alert
        Plant.app.models.Event.create({ time: new Date(), code: alertCode, source: 'addMeasure', targetId: targetId, level: 2 }, function(err, data) {
          console.log('-- Alert created ==>', err, data);
        });
      }
      // Else if there is an current active alert and it's not expired and we must desactive it
      else if (currentAlert != null && currentAlert.expiredAt == null && !alertActive) {
        currentAlert.expiredAt = new Date();
        currentAlert.save(function(err, data) {
          console.log('-- Alert updated ==>', err, data);
        });
      }
    });
  };

  Plant.prototype.addMeasure = function(value, measureType) {
    // Measure creation
    var measureToAdd = { 
      value: value,
      type: measureType, 
      time: new Date(), 
      targetId: this.id
    };

    var targetId = this.id;
    
    // If ground humidity measure, compare with the last value
    if (measureType == 'groundHumidity') {
      this.measures.findOne({ where: { type: measureType }, order: 'time DESC' }, function(err, lastMeasure) {
        //console.log("lastMeasure=>", err, lastMeasure);
        if (lastMeasure != null & value > lastMeasure.value + WATERING_THRESHOLD) {
          // Create event
          Plant.app.models.Event.create({ time: measureToAdd.time, code: 'watering', source: 'addMeasure', targetId: targetId, level: 1 }, onEventCreated);
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
            
            activeAlert(targetId, alertCode, alertActive);
          }
        }
      }
    });
    
    Plant.app.models.Measure.create(measureToAdd, function(err, data) {
      console.log('-- Measure created --');
      console.log(data);
      console.log('---------------------');
    });
  };
	
};
