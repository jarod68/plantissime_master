/**
* Plant.js
*
* @description :: Plant model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    // id: interger, primaryKey autogenerated

    name: {
      type: 'string',
      required: true,
      size: 128
    },

    specie: {
      type: 'string'
    },

    measures: {
      collection: 'Measure',
      via: 'plant'
    },

    getMeasures: function(type, period) {
      console.log('-- plant.getMeasures() --');
      // Getting all probes for this plant
      Probe.find()
        .where({ type: type })
        .populate('plants')
        .populate('measures')
        .exec(console.log);
        // .exec(function(err, probes) {
        //   if (err) {
        //     console.log('getMeasures error => ' + JSON.stringify(err));
        //     return null;
        //   }
        //
        //   console.log(JSON.stringify(probes));
        //   return probes;
        //   //var measures = Measure.find({ probe: })
        // });
    }
  }
};
