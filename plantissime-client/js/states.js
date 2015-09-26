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
			abstract: true,
      url: '/plants',
			templateUrl: 'views/plants.html'
		})
    .state('plants.list', {
      url: '',
      templateUrl: 'views/plants.list.html',
      controller: 'PlantsController'
    })
    .state('plants.detail', {
      url: '/{plantId:[0-9]{1,4}}',
			templateUrl: 'views/plants.detail.html',
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
    })
    .state('admin.species.create', {
			url: '/create',
			views: { 
				'modal@': {
					templateUrl: 'views/admin.species.form.html',
					controller: 'SpeciesEditController'
				}
			}
    })
    .state('admin.species.edit', {
			url: '/edit/{id:[0-9]{1,4}}',
			views: { 
				'modal@': {
					templateUrl: 'views/admin.species.form.html',
					controller: 'SpeciesEditController'
				}
			}
    })
		.state('admin.models', {
			url: '/models',
			templateUrl: 'views/admin.models.html',
			controller: 'ModelsController'
    });
});
