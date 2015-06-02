module.exports = function(SensorModel) {
    SensorModel.findByModel = function(modelNumber, cb) {
        SensorModel.findOne({ where: { modelNumber: modelNumber}}, function(err, sensorModel) {
            console.log(err);
            console.log(sensorModel);
            cb(null, sensorModel);
      });
    };
     
    SensorModel.remoteMethod(
        'findByModel', 
        {
          accepts: {arg: 'modelNumber', type: 'String', http: { source: 'path'}},
          returns: {arg: 'result', type: 'Object', root: true},
          http: {path: '/model/:modelNumber', verb: 'get'}
        }
    ); 
};
