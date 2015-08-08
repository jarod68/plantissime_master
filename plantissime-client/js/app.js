/*  
 *  Plantissime Web Client 
 *
 *  Title       :  Plantissime Application
 *  Description : 
 *  Year        :  2015
 */
var plantiApp = angular.module('PlantissimeApp', [
	'ui.router',
	'planti.controllers',
	'planti.directives',
  'planti.services',
  'planti.filters',
  'lbServices'
]);

// Namespaces
var planti = {};
planti.controllers = angular.module('planti.controllers', ["chart.js"]);
planti.directives = angular.module('planti.directives', []);
planti.services = angular.module('planti.services', ['ngResource']);
planti.filters = angular.module('planti.filters', []);
