module.exports = function(app) {
  app.dataSources.mysqlDB.autoupdate('Plant', function(err) {
    if (err) throw err;
    console.log('Table updated : Plant');
  });
  
  app.dataSources.mysqlDB.autoupdate('Sensor', function(err) {
    if (err) throw err;
    console.log('Table updated : Sensor');
  });
  
  app.dataSources.mysqlDB.autoupdate('Measure', function(err) {
    if (err) throw err;
    console.log('Table updated : Measure');
    
    // In order to not loose data
    app.models.Measure.updateAll({targetType: null}, {targetType: 'Plant'}, function(err, info) {
      if (err) throw err;
      console.log('Data updated : Measure (targetType null => "Plant")', info); 
    });
    app.models.Measure.updateAll({type: "batteryLevel"}, {type: 'power'}, function(err, info) {
      if (err) throw err;
      console.log('Data updated : Measure (type "batteryLevel" => "power")', info); 
    });
  });
  
  app.dataSources.mysqlDB.autoupdate('SensorPlant', function(err) {
    if (err) throw err;
    console.log('Table updated : SensorPlant');
  });
  
  app.dataSources.mysqlDB.autoupdate('Event', function(err) {
    if (err) throw err;
    console.log('Table updated : Event');
    
    // In order to not loose data
    app.models.Event.updateAll({targetType: null}, {targetType: 'Plant'}, function(err, info) {
      if (err) throw err;
      console.log('Data updated : Event (targetType null => "Plant")', info); 
    });
    
  });
};