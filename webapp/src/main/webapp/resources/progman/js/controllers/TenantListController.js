
progman.controller('TenantListController', ['$scope', '$state', '$timeout', 'TenantTypeService' ,
     function ($scope, $state, $timeout, TenantTypeService ) {
		if(!$state.current.searchParams) {
			$scope.searchParams = {"name":"", "type":"", "sortKey":"name", "sortDir":"asc", "currentPage": 1};
		}else{
			$scope.searchParams = $state.current.searchParams;
		}
  		$scope.searchResponse = {};
  		$scope.selectedCellId = "edit0";
  		
   		TenantTypeService.loadAllTenantTypes().then(function(loadedData) {
   			$scope.tenantTypes = loadedData.data;
  		});

  		$scope.createNewItem = function(){
  			$state.transitionTo("tenantedit",{"tenantId":"", "tenantName":$scope.searchParams.name, "tenantType":$scope.searchParams.type});
  		};
  		
  		$scope.edit = function(tenant) {
  			$state.transitionTo("tenantedit", {tenantId:tenant.id});
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
     }]);