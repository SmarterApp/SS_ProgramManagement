progman.controller('PropertyConfigListController', ['$scope', '$http','$state', '$timeout', 'PropertyConfigService',
	 function ($scope,$http,$state,$timeout, PropertyConfigService ) {
		if(!$state.current.searchParams) {
			$scope.searchParams = {"name":"", "envName": "", "sortKey":"name", "sortDir":"asc","currentPage": 1};
		}else{
			$scope.searchParams = $state.current.searchParams;
		}
		
		$scope.searchResponse = {};
		$scope.selectedCellId = "edit0";

		$scope.createNewItem = function(){
			$state.transitionTo("propconfigedit",{"configId":"", "propConfigName":$scope.searchParams.nameContains, "propConfigEnvName":$scope.searchParams.envNameContains});
		};

		$scope.edit = function(propertyConfig) {
			$state.transitionTo("propconfigedit", {configId:propertyConfig.id});
		};
		
		$scope.remove = function(propertyConfig) {
  			if(confirm("Are you sure you want to delete this Configuration?")){
				PropertyConfigService.deletePropertyConfig(propertyConfig.id).then( function(response) {
    				$scope.errors = response.errors;
                	$scope.$broadcast('initiate-config-search');
				});
  			};
  		};

		$scope.history = function(propertyConfig) {
			$state.transitionTo("propconfighistory", {configId:propertyConfig.id});
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
