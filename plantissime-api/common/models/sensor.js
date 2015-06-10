module.exports = function(Sensor) {
    Sensor.receive = function(data, cb) {
      console.log(data);
      var sensor;
      var sensorModel;
      var targets;
      var value;
      var measureToAdd;
      Sensor.findOne({ where: { modelNumber: data.nodeID, itemNumber: data.serial}, include: 'targets'}, function(err, dataSensor) {
        if(dataSensor == null) {
          cb(new Error("Sensor not found"));
        }
        
        sensor = dataSensor;
        targets = sensor.targets();

        Sensor.app.models.SensorModel.findOne({ where: { modelNumber: sensor.modelNumber}}, function(err, dataSensorModel) {
          if(dataSensorModel == null) {
            cb(new Error("SensorModel not found"));
          }
          
          sensorModel = dataSensorModel;
          
          console.log("sensorModel="+sensorModel);
          console.log("sensor="+sensor);
          console.log("targets="+targets);
          
          for(var probeIndex = 0; probeIndex < sensorModel.probes.length; probeIndex++) {
            /* If global probe, measure taken for all target */
            if(sensorModel.probes[probeIndex].isGlobal) {
              for(var targetIndex = 0; targetIndex < targets.length; targetIndex++) {
                
                measureToAdd = { 
                  type: sensorModel.probes[probeIndex].type, 
                  time: new Date(), 
                  targetId: targets[targetIndex].id
                };
                
                switch (sensorModel.probes[probeIndex].type) {
                  case "temperature":
                    measureToAdd.value = data.temp;
                    break;
                    
                  case "luminosity":
                    measureToAdd.value = data.lum;
                    break;
                    
                  case "airHumidity":
                    measureToAdd.value = data.hum;
                    break;
                    
                  case "groundHumidity":
                    measureToAdd.value = data.s;
                    break;
                
                  default:
                    measureToAdd.value = 0;
                    break;
                }
                
                Sensor.app.models.Measure.create(measureToAdd, function(err, data) {
                  console.log('-- Measure created --');
                  console.log(data);
                  console.log('---------------------');
                });
              }
            }
            else if(sensorModel.probes[probeIndex].targetIndex < targets.length) {
              
                measureToAdd = { 
                  type: sensorModel.probes[probeIndex].type, 
                  time: new Date(), 
                  targetId: targets[sensorModel.probes[probeIndex].targetIndex].id
                };
                
                switch (sensorModel.probes[probeIndex].type) {
                  case "temperature":
                    measureToAdd.value = data["temp"+probeIndex];
                    break;
                    
                  case "luminosity":
                    measureToAdd.value = data["lum"+probeIndex];
                    break;
                    
                  case "airHumidity":
                    measureToAdd.value = data["hum"+probeIndex];
                    break;
                    
                  case "groundHumidity":
                    measureToAdd.value = data["s"+probeIndex];
                    break;
                
                  default:
                    measureToAdd.value = 0;
                    break;
                }
                
                Sensor.app.models.Measure.create(measureToAdd, function(err, data) {
                  console.log('-- Measure created --');
                  console.log(data);
                  console.log('---------------------');
                });
            }
          }
        });
      });
  		/*Sensor.findOne({ where: { modelNumber: modelNumber, itemNumber: itemNumber}}, function(err, data) {
        
      });*/
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
