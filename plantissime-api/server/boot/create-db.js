module.exports = function(app) {
  app.dataSources.mysqlDB.autoupdate('Plant', function(err) {
    if (err) throw err;
    console.log('Plant table created');
  });
  app.dataSources.mysqlDB.autoupdate('Sensor', function(err) {
    if (err) throw err;
    console.log('Sensor table created');
  });
  app.dataSources.mysqlDB.automigrate('Measure', function(err) {
    if (err) throw err;
    console.log('Measure table created');
  });
  app.dataSources.mysqlDB.autoupdate('SensorPlant', function(err) {
    if (err) throw err;
    console.log('SensorTarget table created');
  });
  app.dataSources.mysqlDB.autoupdate('Target', function(err) {
    if (err) throw err;
    console.log('Target table created');
  });
};