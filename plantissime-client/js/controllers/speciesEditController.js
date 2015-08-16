/*  
 *  Plantissime Web Client 
 *
 *  Title       :  SpeciesEditController
 *  Description :
 *  Year        :  2015
 */
planti.controllers.controller('SpeciesEditController', function ($scope, $state, $stateParams, PlantClassification) {
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
	
	$('#modal')
		.modal({
			closable: false,
			onApprove: function () {
				PlantClassification.create($scope.specie);
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