
progman.controller('ComponentListController', ['$scope', '$state', '$timeout', 
     function ($scope, $state, $timeout ) {
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