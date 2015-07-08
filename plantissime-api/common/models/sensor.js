module.exports = function(Sensor) {
    var BATTERY_THRESHOLD = 20;
  
  Sensor.prototype.addMeasure = function(value, measureType) {
    // Measure creation
    var measureToAdd = { 
      value: value,
      type: measureType, 
      time: new Date(), 
      targetId: this.id,
      targetType: 'Sensor'
    };
    Sensor.app.models.Measure.create(measureToAdd, function(err, data) {
      console.log('-- Measure created =>', err, data);
    });
    
    if(measureType == 'batteryLevel') {
      Sensor.app.models.Event.activeAlert(measureToAdd.targetId, 'Sensor', 'batteryLow', (value < BATTERY_THRESHOLD));
    }
  };
    
  Sensor.receive = function(data, cb) {
    console.log('----- ----- ----- -----');
    
    // Get sensor
    Sensor.findOne({ where: { itemNumber: data.serial }, include: 'targets'}, function(err, sensor) {
      if(sensor != null) {
        console.log('Receive data from sensor M:' + sensor.modelNumber + ' I:' + sensor.itemNumber);
          
        // Get model of this sensor
        Sensor.app.models.SensorModel.findOne({ where: { modelNumber: sensor.modelNumber}}, function(err, sensorModel) {
          if(sensorModel != null) {
            console.log('Model with ' + sensorModel.probes.length + ' probes');
            
            // Get targets of this sensor
            sensor.targets(function(err, targets) {
              if(targets != null) {
                console.log(targets.length + ' targets found');
                
                // For each probe
                for(var probeIndex = 0; probeIndex < sensorModel.probes.length; probeIndex++) {
                  
                  // If local, measure added for this sensor
                  if(sensorModel.probes[probeIndex].isLocal) {
                    sensor.addMeasure(data[sensorModel.probes[probeIndex].varName], sensorModel.probes[probeIndex].type);
                  }
                  // If global probe, measure created for each target
                  else if(sensorModel.probes[probeIndex].isGlobal) {
                    // For each target of this sensore
                    for(var targetIndex = 0; targetIndex < targets.length; targetIndex++) {
                      // Add measure
                      targets[targetIndex].addMeasure(data[sensorModel.probes[probeIndex].varName], sensorModel.probes[probeIndex].type);
                    }
                  }
                  // If not global probe and the target is defined, measure created for this target
                  else if(sensorModel.probes[probeIndex].targetIndex < targets.length) {
                    // Add measure  
                    targets[sensorModel.probes[probeIndex].targetIndex].addMeasure(data[sensorModel.probes[probeIndex].varName], sensorModel.probes[probeIndex].type);
                  }
                  else {
                    
                  }
                }
                cb(null);
                
              }
            });
          }
          else {
            console.log(err);
            var error = new Error("SensorModel not found");
            error.statusCode = error.status = 500;
            error.code = 'SENSOR_MODEL_NOT_FOUND';
            cb(error);
          } 
        });
      }
      else {
        console.log(err);
        var error = new Error("Sensor not found");
        error.statusCode = error.status = 500;
        error.code = 'SENSOR_NOT_FOUND';
        cb(error);
      }
    });
  }
     
  Sensor.remoteMethod(
    'receive', 
    {
      accepts: [{arg: 'data', type: 'object', http: { source: 'body' }}],
      returns: {arg: 'result', type: 'String'}
    }
  ); 

};
