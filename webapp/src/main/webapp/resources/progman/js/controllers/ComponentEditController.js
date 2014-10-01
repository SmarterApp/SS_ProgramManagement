
progman.controller('ComponentEditController',['$scope','$state', 'loadedData', 'ComponentService',
    function($scope, $state, loadedData, ComponentService) {
		$scope.savingIndicator = false;
		$scope.errors = loadedData.errors;
		$scope.component = loadedData.data;
		$scope.actionButton = '';
		$scope.formAction = 'Add';
		if($scope.component && $scope.component.id){
			$scope.formAction = 'Edit';
		}
		$scope.save = function(component){
			$scope.savingIndicator = true;
			ComponentService.saveComponent(component).then(function(response){
				$scope.savingIndicator = false;
				$scope.errors = response.errors;
				if($scope.errors.length === 0){
					$scope.componentForm.$setPristine();
					$scope.component = response.data;
				}
			});
		};
		
		$scope.cancel = function() {
			$scope.actionButton = 'cancel';
			$scope.componentForm.$setPristine();
			$state.transitionTo("componentedit", {componentId:$scope.component.id});
		};
		
		$scope.returnToSearch = function() {
			$scope.actionButton = 'returnToSearch';
			$state.transitionTo("componentsearch");
		};
		
  		$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
    		if ($scope.componentForm.$dirty && $scope.actionButton != 'cancel') {
    			if(!confirm("You have unsaved changes. Are you sure you want to leave this page?")){
    				event.preventDefault();
    			}    	
	    	}
  		});
  		
		$scope.$on('$viewContentLoaded', function() { 
			if ($scope.component.name && !$scope.component.id) {
				$scope.componentForm.$setDirty();
			}
		});
	}
]);

