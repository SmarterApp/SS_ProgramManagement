
progman.controller('ComponentListController', ['$scope', '$state', '$timeout', 'ComponentService', 
     function ($scope, $state, $timeout, ComponentService) {
	 	if(!$state.current.searchParams) {
	 		$scope.searchParams = {"name":"", "sortKey":"name", "sortDir":"asc", "currentPage": 1};
	 	}else{
	 		$scope.searchParams = $state.current.searchParams;
	 	}
  		$scope.searchResponse = {};
  		$scope.selectedCellId = "edit0";
  		
  		$scope.createNewItem = function(){
  			$state.transitionTo("componentedit",{"componentId":"", "componentName":$scope.searchParams.name});
  		};
  		
  		$scope.edit = function(component) {
  			$state.transitionTo("componentedit", {componentId:component.id});
  		};
  		
  		$scope.remove = function(component) { 			
  			if(confirm("Are you sure you want to delete this component? Any tenant or asset group references to this component will be affected.")){
  				ComponentService.deleteComponent(component.id).then( function(response) {
    				$scope.errors = response.errors;
                    if (!$scope.errors || $scope.errors.length == 0) {
                    	$scope.$broadcast('initiate-component-search');
                    }
				});
  			};
  		};
  		
  		$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
  		    $state.current.searchParams = $scope.searchParams;
  		});
  		
		// set the first element in the table to be tabable
		$timeout(function() {
			if(document.getElementById($scope.selectedCellId) != null) {
  	   			document.getElementById($scope.selectedCellId).setAttribute("tabindex", "0");
			}
		}, 400);
      }
]);