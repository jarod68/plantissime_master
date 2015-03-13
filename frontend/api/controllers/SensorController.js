/**
 * SensorController
 *
 * @description :: Server-side logic for managing Sensors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `SensorController.index()`
   */
  index: function(req, res) {
    sails.log('SensorController.index');
    Sensor.find()
      .populate('plants')
      .exec(function(error, resultSensors) {
      sails.log('Sensor.find => ', error, resultSensors);

      Plant.find({}).exec(function(error, resultPlants) {
        return res.view('sensor/index', {
          sensors: resultSensors,
          plants: resultPlants
        });
      });
    });
  },

  /**
   * `SensorController.create()`
   */
  create: function(req, res) {
    sails.log('SensorController.create');
    var data = {
			name: req.param('name'),
			serialNumber: req.param('serialNumber'),
      plants: [{id:req.param('plant1')}, {id:req.param('plant2')}, {id:req.param('plant3')}, {id:req.param('plant4')}],

      // TODO
      settings: {
        plantsCount: 4,
        probes: [
          { global: true, type: 'temperature'},
          { global: true, type: 'luminosity'},
          { global: true, type: 'humidityAir'},
          { global: false, type: 'humidityGround', plantIndex: 0},
          { global: false, type: 'humidityGround', plantIndex: 1},
          { global: false, type: 'humidityGround', plantIndex: 2},
          { global: false, type: 'humidityGround', plantIndex: 3}
        ]
      }
		};
    Sensor.create(data, function(err, model) {
			// If an error throw
      if (err) {
        sails.log(err);
      }

			// If creation is ok
      // var plantsToLink = [{id:req.param('plant1')}, {id:req.param('plant2')}, {id:req.param('plant3')}, {id:req.param('plant4')}];

      // Add probes
      // TODO Change this to be dynamic varying sensor
      // model.probes.add({
      //   type: 'temperature',
      //   plants: plantsToLink
      // });
      // model.probes.add({
      //   type: 'luminosity',
      //   plants: plantsToLink
      // });
      // model.probes.add({
      //   type: 'humidityAir',
      //   plants: plantsToLink
      // });
      // model.probes.add({
      //   type: 'humidityGround',
      //   plants: [{id:req.param('plant1')}]
      // });
      // model.probes.add({
      //   type: 'humidityGround',
      //   plants: [{id:req.param('plant2')}]
      // });
      // model.probes.add({
      //   type: 'humidityGround',
      //   plants: [{id:req.param('plant3')}]
      // });
      // model.probes.add({
      //   type: 'humidityGround',
      //   plants: [{id:req.param('plant4')}]
      // });
      //model.save(function(err, rs) {
        // Display result in log
        //console.log(model.toJSON());
        // Then redirect to new plant details
        return res.redirect('/sensor');
      //});

    });

  },

  /**
   * `SensorController.delete()`
   */
  delete: function(req, res) {
    sails.log('SensorController.delete');
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};
