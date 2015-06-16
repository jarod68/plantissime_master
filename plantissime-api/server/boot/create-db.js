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
  });
  app.dataSources.mysqlDB.autoupdate('SensorPlant', function(err) {
    if (err) throw err;
    console.log('Table updated : SensorPlant');
  });
  app.dataSources.mysqlDB.autoupdate('Target', function(err) {
    if (err) throw err;
    console.log('Table updated : Target');
  });  
  app.dataSources.mysqlDB.autoupdate('Event', function(err) {
    if (err) throw err;
    console.log('Table updated : Event');
  });
};