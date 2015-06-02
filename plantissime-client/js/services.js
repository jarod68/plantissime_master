var plantissimeServices = angular.module('PlantissimeServices', ['ngResource']);

plantissimeServices.factory('Plants', ['$resource',
  function($resource){
    return $resource('plants.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);