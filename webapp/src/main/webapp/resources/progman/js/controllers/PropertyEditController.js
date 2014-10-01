
progman.controller('PropertyEditController',['$scope','$state','loadedData','PropertyConfigService',
        function($scope, $state, loadedData, PropertyConfigService) {
			$scope.savingIndicator = false;
		    $scope.errors = loadedData.errors;
		    $scope.propertyConfig = loadedData.data;
		    $scope.actionButton = '';
			$scope.formAction = 'Add';
			if($scope.propertyConfig && $scope.propertyConfig.id){
				$scope.formAction = 'Edit';
			}
		    $scope.save = function(propertyConfig){
		    	$scope.savingIndicator = true;
		    	PropertyConfigService.savePropertyConfig(propertyConfig).then(function(response) {
		    				$scope.errors = response.errors;
		    				$scope.savingIndicator = false;
		    				if($scope.errors.length === 0){
		    					$scope.propertyConfig = response.data;
		    					$scope.configForm.$setPristine();
		    				}
		    			}
		    	);
		    };

		    $scope.cancel = function() {
		    	$scope.actionButton = 'cancel';
		    	$scope.configForm.$setPristine();
		    	$state.transitionTo("propconfigedit", {configId:$scope.propertyConfig.id});
			};
			
		    $scope.returnToSearch = function() {
		    	$scope.actionButton = 'returnToSearch';
		    	$state.transitionTo("propconfigsearch");
			};
			
	  		$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
	    		if ($scope.configForm.$dirty && $scope.actionButton != 'cancel') {
	    			if(!confirm("You have unsaved changes. Are you sure you want to leave this page?")){
	    				event.preventDefault();
	    			}    	
		    	}
	  		});
	  		
			$scope.$on('$viewContentLoaded', function() { 
				if (($scope.propertyConfig.name || $scope.propertyConfig.envName) && !$scope.propertyConfig.id) {
					$scope.configForm.$setDirty();
				}
			});
		}
]);

