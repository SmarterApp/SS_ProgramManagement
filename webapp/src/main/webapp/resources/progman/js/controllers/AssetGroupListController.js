progman.controller('AssetGroupListController', ['$scope', '$state', '$timeout', 'TenantService', 'ComponentService', 'AssetGroupService',
     function ($scope, $state, $timeout, TenantService, ComponentService, AssetGroupService ) {
		if(!$state.current.searchParams) {
			$scope.searchParams = {"tenantId":"", "tenantName":"", "componentName":"", "sortKey":"tenant.name", "sortDir":"asc", "currentPage":1};
		}else{
			$scope.searchParams = $state.current.searchParams;
			if(!$state.current.searchParams.tenantName) {
	            $scope.searchParams.tenantId= "";
	            $scope.searchParams.tenantName = "";
	        }
		}
				
  		$scope.searchResponse = {};
  		$scope.selectedCellId = "edit0";
  		
  		$scope.createNewItem = function() {
  			$state.transitionTo("assetgroupnew", {"assetGroupId":"", "tenantId":$scope.searchParams.tenantId ? $scope.searchParams.tenantId : "",
  					"componentId":$scope.searchParams.componentName ? $scope.findComponentIdByName($scope.searchParams.componentName) : ""});
  		};
  		
  		$scope.edit = function(assetGroup) {
  			$state.transitionTo("assetgroupedit", {assetGroupId:assetGroup.id});
  		};
  		
  		$scope.clone = function(assetGroup) {
  			$state.transitionTo("assetgroupclone", {assetGroupId:assetGroup.id});
  		};
  		
  		$scope.remove = function(assetGroup) { 			
  			if(confirm("Are you sure you want to delete this asset group?")){
				AssetGroupService.deleteAssetGroup(assetGroup).then( function(response) {
    				$scope.errors = response.errors;
    				var index = $scope.searchResponse.searchResults.indexOf(assetGroup);
    				$scope.searchResponse.searchResults.splice(index, 1);
				});
  			};
  		};
  		
  		$scope.changeSearchTenant = function(newTenant) {
   			if (newTenant) {
   				$scope.searchParams.tenantId = newTenant.id;
   			} else {
   				$scope.searchParams.tenantId = null;
   			}
   		};
   		
		$scope.findComponentIdByName = function(componentName) {
			return $.grep($scope.components, function(n, i) {
			      return n.name == componentName;
			})[0].id;
		};

   		$scope.formatSearchFields = function() {
   		    if (!$scope.searchParams.tenantName) {
   		        $scope.searchParams.tenantId = null;
   		    }
   		};

  		ComponentService.loadAllComponents(500).then(function(loadedData){
  			$scope.components = loadedData.data.searchResults;
  		});

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
