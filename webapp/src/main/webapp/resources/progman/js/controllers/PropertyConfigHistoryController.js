progman.controller('PropertyConfigHistoryController',['$scope','$state','loadedData','PropertyConfigService',
	  function PropertyConfigHistoryController($scope, $state, loadedData, PropertyConfigService) {
		$scope.toggle = function(audit){
			audit.expanded = !audit.expanded;
		};
		
		$scope.propertyConfig = loadedData.data;
		
		$scope.searchResponse = {};
		$scope.searchParams = {"currentPage": 0, "id": $scope.propertyConfig.id , "sortKey":"auditTimestamp", "sortDir":"desc"};
		
	    $scope.returnToSearch = function() {
	    	$scope.actionButton = 'returnToSearch';
	    	$state.transitionTo("propconfigsearch");
		};

	}
]);