module.exports = function(SensorModel) {
    SensorModel.findByModel = function(modelNumber, cb) {
        SensorModel.findOne({ where: { modelNumber: modelNumber}}, function(err, sensorModel) {
            if(sensorModel == null) {
                var error = new Error('Sensor model '+modelNumber+' not found');
                error.statusCode = error.status = 404;
                error.code = 'MODEL_NOT_FOUND';
                cb(error);
            }
            else {
                console.log(sensorModel);
                cb(null, sensorModel);
            }
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
