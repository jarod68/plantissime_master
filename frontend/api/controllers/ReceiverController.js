/**
 * ReceiverController
 *
 * @description :: Server-side logic for receive data
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function(req, res) {
    sails.log('-- ReceiverController.index --');
		sails.log(req.body);
		//$json = '{"nodeID":"plant2","serial":"13A20040A75DCE","lum":14.0,"hum":37,"temp":21,"s0":453.0,"s1":503.0,"s2":-1.0,"s3":682.0,"power":3242}';
		var data = req.body;

    Sensor.findOne()
			.where({ name: data.nodeID })
			.populate('plants')
			.exec(function(err, sensor) {

				if (err) {
					sails.log(err);
					return res.serverError();
				}

				sails.log('Sensor => ', sensor);
				sensor.settings.probes.forEach(function(probe) {
					sails.log('Probe => ', probe);
					if(probe.global) {

						sensor.plants.forEach(function(plant) {
							sails.log('  Plant => ', plant);
							var measure = {
								type: probe.type,
								plant: plant.id,
								time: new Date()
							}

							switch(probe.type) {
								case 'luminosity':
									measure.value = data.lum;
									break;

								case 'temperature':
									measure.value = data.temp;
									break;

								case 'humidityAir':
									measure.value = data.hum;
									break;
							}

							sails.log(measure);
							if(measure.value != null)
								Measure.create(measure, sails.log);
						});
					}
					else
					{
						var measure = {
							type: probe.type,
							plant: sensor.plants[probe.plantIndex],
							time: new Date()
						}
						switch(probe.type) {
							case 'humidityGround':
								measure.value = data['s'+probe.plantIndex];
								break;
						}

						sails.log(measure);
						if(measure.value != null)
							Measure.create(measure, sails.log);
					}
				});
			});

		return res.ok();
	}
};
