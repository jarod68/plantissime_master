/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `ApiController.plantMeasuseures()`
   */
  plantMeasures: function (req, res) {
		sails.log('plantMeasures');
		// Get parameters
		var plantId = req.param('id');
		var type = req.param('type');
		var period = req.param('period');

		// Calculate the period
		var periodEnd = new Date();

		var periodStart;
		switch(period) {

			case 'day':
				periodStart = new Date().setDate(periodEnd.getDate()-1);
				break;

			case 'week':
				periodStart = new Date().setDate(periodEnd.getDate()-7);
				break;

			case 'month':
				periodStart = new Date().setMonth(periodEnd.getMonth()-1);
				break;

			// Fix the default start to (end - 1 day)
			default:
				periodStart = new Date().setDate(periodEnd.getDate()-1);

		}

		console.log(plantId);
		console.log(type);

		// Get measures
		Measure.find()
			.where({ plant: plantId })
			.where({ type: type })
			.where({ time: { '>=': periodStart }})
			.exec(function(err, result) {
        if(err) sails.log();
        return res.json(result);
      });
  }
};
