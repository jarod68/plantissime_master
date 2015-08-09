plantiApp.config(function ($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .state('plants', {
      url: '/plants',
      templateUrl: 'views/plant-list.html',
      controller: 'PlantsController'
    })
    .state('plantsDetail', {
      url: '/{plantId:[0-9]{1,4}}',
			templateUrl: 'views/plant-detail.html',
			controller: 'PlantDetailController'
    })
    .state('settings', {
			abstract: true,
			url: '/settings',
			templateUrl: 'views/settings.html'
    })
    .state('settings.sensors', {
			url: '/sensors',
			templateUrl: 'views/settings.sensors.html',
			controller: 'SensorsController'
    })
    .state('settings.sensors.detail', {
			url: '/{id:[0-9]{1,4}}',
			views: {
				'detail': {
					templateUrl: 'views/settings.sensors.detail.html',
					controller: 'SensorsDetailController'
				}
			}
    })
    .state('admin', {
			abstract: true,
			url: '/admin',
			templateUrl: 'views/admin.html'
    })
    .state('admin.species', {
			url: '/species',
			templateUrl: 'views/admin.species.html',
			controller: 'SpeciesController'
    });
});
