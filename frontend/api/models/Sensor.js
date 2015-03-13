/**
* Sensor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    serialNumber: {
      type: 'string',
      required: true
    },
    // probes: {
    //   collection: 'Probe',
    //   via: 'sensor'
    // }
    plants: {
      collection: 'Plant'
    },
    settings: {
      type: 'json'
    }
  }
};
