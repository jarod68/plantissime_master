module.exports = function(Sensor) {
    Sensor.receive = function(data, cb) {
      console.log(data);

      // Get sensor
      Sensor.findOne({ where: { itemNumber: data.nodeID }, include: 'targets'}, function(err, sensor) {
        if(sensor == null || err != null) {
          console.log(err);
          var error = new Error("Sensor not found");
          error.statusCode = error.status = 500;
          error.code = 'SENSOR_NOT_FOUND';
          cb(error);
        }
        else {
          console.log("sensor="+sensor);
          
          // Get model of this sensor
          Sensor.app.models.SensorModel.findOne({ where: { modelNumber: sensor.modelNumber}}, function(err, sensorModel) {
            if(sensorModel == null || err != null) {
              console.log(err);
              var error = new Error("SensorModel not found");
              error.statusCode = error.status = 500;
              error.code = 'SENSOR_MODEL_NOT_FOUND';
              cb(error);
            }
            
            
            // Get targets of this sensor
            sensor.targets(function(err, targets) {
              
              console.log("sensorModel="+sensorModel);
              
              console.log("targets="+targets);
              
              // For each probe
              for(var probeIndex = 0; probeIndex < sensorModel.probes.length; probeIndex++) {
                // If global probe, measure created for each target
                if(sensorModel.probes[probeIndex].isGlobal) {
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
            });
          });
        }
        

      });
      
      cb(null);
    }
     
    Sensor.remoteMethod(
        'receive', 
        {
          accepts: [{arg: 'data', type: 'object', http: { source: 'body' }}],
          returns: {arg: 'result', type: 'String'}
        }
    ); 

};
