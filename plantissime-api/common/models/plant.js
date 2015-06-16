module.exports = function(Plant) {

  Plant.prototype.addMeasure = function(value, measureType) {
    // Measure creation
    var measureToAdd = { 
      value: value,
      type: measureType, 
      time: new Date(), 
      targetId: this.id
    };


    
    Plant.app.models.Measure.create(measureToAdd, function(err, data) {
      console.log('-- Measure created --');
      console.log(data);
      console.log('---------------------');
    });
  };
	
};
