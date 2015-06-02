module.exports = function(Sensor) {
    Sensor.receive = function(modelNumber, itemNumber, cb) {
      var sensor;
      var sensorModel;
      Sensor.findOne({ where: { modelNumber: modelNumber, itemNumber: itemNumber}, include: 'targets'}, function(err, dataSensor) {
        console.log(err);
        console.log(dataSensor);
        sensor = dataSensor;

        Sensor.app.models.SensorModel.findOne({ where: { modelNumber: modelNumber}}, function(err, dataSensorModel) {
          console.log(err);
          console.log(dataSensorModel);
          sensorModel = dataSensorModel;
          
           console.log(sensorModel);
           console.log(sensor);
          for(var probeIndex = 0; probeIndex < sensorModel.probes.length; probeIndex++) {
            if(sensorModel.probes[probeIndex].isGlobal) {
              for(var targetIndex = 0; targetIndex < sensor.targets.length; targetIndex++) {
                console.log('------');
                console.log(sensor.targets);
                Sensor.app.models.Measure.create({ value: '10', type: sensorModel.probes[probeIndex].type, time: new Date(), targetId: sensor.targets[targetIndex].id}, function(err, data) {
                  console.log('-- Measure create --');
                  console.log(err);
                  console.log(sensorModel);
                });
              }
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
          accepts: [
            {arg: 'modelNumber', type: 'String'}, 
            {arg: 'itemNumber', type: 'String'},
            {arg: 'lum', type: 'Number'},
            {arg: 'hum', type: 'Number'},
            {arg: 'temp', type: 'Number'},
            {arg: 's0', type: 'Number'},
            {arg: 's1', type: 'Number'},
            {arg: 's2', type: 'Number'},
            {arg: 's3', type: 'Number'}
          ],
          returns: {arg: 'result', type: 'String'}
        }
    ); 

};
