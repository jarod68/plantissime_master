planti.services.factory('Plants', ['$resource',
  function($resource){
    return $resource('plants.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);