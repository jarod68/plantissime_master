module.exports = function(Plant) {

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
        console.log("lastMeasure:");
        console.log(lastMeasure);
        if (lastMeasure != null & value > lastMeasure.value) {
          Plant.app.models.Event.create({ time: measureToAdd.time, type: 'watering', source: 'increasedHumidity', targetId: targetId }, function(err, data) {
              console.log('-- Event created --');
              console.log(err);
              console.log(data);
              data.save();
              console.log('---------------------');
          });
        }
      });
    }
    
    Plant.app.models.Measure.create(measureToAdd, function(err, data) {
      console.log('-- Measure created --');
      console.log(data);
      console.log('---------------------');
    });
  };
	
};
