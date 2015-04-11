/**
 * Route Mappings
 * (sails.config.routes)
 *
 * For more information on configuring routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  '/': {
    view: 'home'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  'get /plant': 'PlantController.index',
  'get /plant/:id?': 'PlantController.details',
  'post /plant/create': 'PlantController.create',

  'get /sensor': 'SensorController.index',
  'post /sensor/create': 'SensorController.create',

  '/receive': 'ReceiverController.index',

  'get /api/plant/:id/measures/:type': 'ApiController.plantMeasures'
};
