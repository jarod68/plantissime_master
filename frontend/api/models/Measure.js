/**
* Measure.js
*
* @description ::
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    value: {
      type: 'float',
      required: true
    },

    type: {
      type: 'string',
      enum: ['temperature', 'luminosity', 'humidityGround', 'humidityAir'],
      required: true
    },

    time: {
      type: 'datetime',
      required: true
    },

    // probe: {
    //   model: 'Probe'
    // },

    plant: {
      model: 'Plant',
      via: 'measures'
    }
  }
};
