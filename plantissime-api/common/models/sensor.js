module.exports = function(Sensor) {
    Sensor.receive = function(data, cb) {
      console.log(data);


      var value;
      Sensor.findOne({ where: { modelNumber: data.nodeID, itemNumber: data.serial}, include: 'targets'}, function(err, sensor) {
        if(sensor == null) {
          cb(new Error("Sensor not found"));
        }
        
        sensor.targets(function(err, targets) {

          Sensor.app.models.SensorModel.findOne({ where: { modelNumber: sensor.modelNumber}}, function(err, sensorModel) {
            if(sensorModel == null) {
              cb(new Error("SensorModel not found"));
            }
            
            console.log("sensorModel="+sensorModel);
            console.log("sensor="+sensor);
            console.log("targets="+targets);
            
            // Measures creation 
            // For each probe
            for(var probeIndex = 0; probeIndex < sensorModel.probes.length; probeIndex++) {
              
              // If global probe, measure created for each target
              if(sensorModel.probes[probeIndex].isGlobal) {
                for(var targetIndex = 0; targetIndex < targets.length; targetIndex++) {
                  
                  switch (sensorModel.probes[probeIndex].type) {
                    case "temperature":
                      value = data.temp;
                      break;
                      
                    case "luminosity":
                      value = data.lum;
                      break;
                      
                    case "airHumidity":
                      value = data.hum;
                      break;
                      
                    case "groundHumidity":
                      value = data.s;
                      break;
                  
                    default:
                      value = 0;
                      break;
                  }
                  
                  targets[targetIndex].addMeasure(value, sensorModel.probes[probeIndex].type);
                }
              }
              // If not global probe and the target is defined, measure created for this target
              else if(sensorModel.probes[probeIndex].targetIndex < targets.length) {
                  
                  switch (sensorModel.probes[probeIndex].type) {
                    case "temperature":
                      value = data["temp"+probeIndex];
                      break;
                      
                    case "luminosity":
                      value = data["lum"+probeIndex];
                      break;
                      
                    case "airHumidity":
                      value = data["hum"+probeIndex];
                      break;
                      
                    case "groundHumidity":
                      value = data["s"+probeIndex];
                      break;
                  
                    default:
                      value = 0;
                      break;
                  }
                  
                  console.log(sensorModel.probes[probeIndex]);
                  targets[sensorModel.probes[probeIndex].targetIndex].addMeasure(value, sensorModel.probes[probeIndex].type);
              }
            }
          });
        });
      });
      
      cb(null);
    }
     
    Sensor.remoteMethod(
        'receive', 
        {
          accepts: [{arg: 'data', type: 'object', http: { source: 'body' }}
            
            /*{arg: 'modelNumber', type: 'String'}, 
            {arg: 'itemNumber', type: 'String'},
            {arg: 'lum', type: 'Number'},
            {arg: 'hum', type: 'Number'},
            {arg: 'temp', type: 'Number'},
            {arg: 's0', type: 'Number'},
            {arg: 's1', type: 'Number'},
            {arg: 's2', type: 'Number'},
            {arg: 's3', type: 'Number'}*/
          ],
          returns: {arg: 'result', type: 'String'}
        }
    ); 

};
