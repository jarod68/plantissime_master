/**
 * PlantController
 *
 * @description :: Server-side logic for managing Plants
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function(req, res) {
			Plant.find({}, function(error, data) {
				console.log(data.length + ' plants found.');
				return res.view('plant/index.jade', {
					plants: data
				});
			});
	},

	create: function(req, res) {
		var data = {
			name: req.param('name'),
			specie: req.param('specie')
		};
		Plant.create(data, function(err, model) {
			// If an error throw
			if (err) {
				console.log(JSON.stringify(err));
				return res.serverError();
			}
			// If creation is ok
			console.log(model.toJSON());
			// Then redirect to new plant details
			return res.redirect('/plant/'+model.id);
		});

	},

	details: function(req, res) {
		console.log('-- Plant details --');
		Plant.findOne()
			.where({id: req.param('id')})
			.then(function(dataOne) {
				console.log(dataOne.toJSON());

				// Getting list plant
				Plant.find({}, function(errorList, dataList) {
					return res.view('plant/details.jade', {
						plants: dataList,
						currentPlant: dataOne
					});
				});
			}).catch(function(err) {
				console.log(JSON.stringify(err));
				return res.notFound(err);
			});
	}

};
