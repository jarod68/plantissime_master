/*  
 *  Plantissime Web Client 
 *
 *  Title       :  SpeciesEditController
 *  Description :
 *  Year        :  2015
 */
planti.controllers.controller('SpeciesEditController', function ($scope, $state, $stateParams, PlantClassification, Picture, Upload) {
	$scope.measureTypes = [
		{ text: 'Temperature', value: 'temperature' },
		{ text: 'Ground humidity', value: 'groundHumidity ' },
		{ text: 'Air humdidity', value: 'airHumidity' },
		{ text: 'Luminosity', value: 'luminosity' }
	];
	
	$scope.types = [
		{ text: 'Minimum', value: 'min' },
		{ text: 'Maximum', value: 'max' },
		{ text: 'Average', value: 'average' }
	];
	
	$scope.specie = { };
	$scope.specie.tags = [];
	$scope.specie.recommendationsList = [];
	
	function move(arr, val) {
		for (var i = 0, j = 0, l = arr.length; i < l; i++) {
			if (arr[i] !== val) {
				arr[j++] = arr[i];
			}
		}
		arr.length = j;
	}
	
	// Tags/Categories
	$scope.tagAdd = function (toAdd) {
		$scope.specie.tags.push(angular.copy($scope.tagToAdd));
		$scope.tagToAdd = "";
	}
	
	$scope.tagRemove = function (toRemove) {
		move($scope.specie.tags, toRemove);
	}
	
	// Recommendation
	$scope.recAdd = function (toAdd) {
		toAdd.id = 0;
		$scope.specie.recommendationsList.push(angular.copy(toAdd));
	}
	
	$scope.recRemove = function (toRemove) {
		move($scope.specie.recommendations, toRemove);
	}
	
    $scope.$watch('file', function (file) {
			console.log(file);
			if(file!=null) {
      	$scope.upload($scope.file);
			}
    });

    /* optional: set default directive values */
    //Upload.setDefaults( {ngf-keep:false ngf-accept:'image/*', ...} );

    $scope.upload = function (file) {
        Upload.upload({
            url: 'api/Pictures/PlantClassification/upload',
            fields: { },
            file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + ' uploaded. Response: ', data);
						$scope.specie.pictureFile = data.result.files.file[0].name;
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
    };
	
	$('#modal')
		.modal({
			closable: false,
			onApprove: function () {
				
				var newSpecie = PlantClassification.create($scope.specie);
				//Picture.upload({ container: 'PlantClassification', file: '', res: obj? })
				console.log($scope.specie);
				$state.go('admin.species', null, { reload: true });
			},
			onDeny: function () {
				$state.go('admin.species');
			}
		})
  	.modal('show')
	;
});