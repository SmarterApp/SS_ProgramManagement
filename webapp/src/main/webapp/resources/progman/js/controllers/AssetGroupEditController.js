
progman.controller('AssetGroupEditController',['$scope','$state', 'loadedData', 'cloneData', 'AssetGroupService', 'TenantService', 'ComponentService','AssetPoolService',
    function($scope, $state,  loadedData, cloneData, AssetGroupService, TenantService, ComponentService, AssetPoolService) {
		$scope.baseUrl = baseUrl;
		$scope.components = [];

		if ($state.params.tenantId || $state.params.componentId) {
			$scope.assetGroup = {tenant:loadedData.data ? loadedData.data : {}, component:$state.params.componentId ? {id:$state.params.componentId} : {}};
			loadedData = { data:{}, errors:[] };
			$scope.selectedTenantName = $scope.assetGroup.tenant.name ? $scope.assetGroup.tenant.name + ' - ' + $scope.assetGroup.tenant.description : '';
			$scope.selectedAssetGroupComponent = $state.params.componentId;
		} else {
			$scope.assetGroup = loadedData.data;
		}
		
   		$scope.errors = loadedData.errors;
   		$scope.savingIndicator = false;
   		$scope.actionButton = '';
   		$scope.assetsFromPool = [];
   		$scope.title = "New";

   		if (loadedData.data.id) {
   			$scope.title = "Edit";
   			$scope.tenantModel = $scope.assetGroup.tenant;
			$scope.selectedTenantType = $scope.assetGroup.tenant.type;
			$scope.selectedTenantName = $scope.assetGroup.tenant.name + ' - ' + $scope.assetGroup.tenant.description;
			$scope.selectedAssetGroupComponent = $scope.assetGroup.component.id;
   		} else if(cloneData.data.id) {
   			$scope.assetGroup.assets = cloneData.data.assets;
   			$scope.title = "Clone";
   		}

   		if ($scope.assetGroup.tenant) {
   			populateAssetPool();
   		}

		$scope.save = function(assetGroup){
		    if (!$scope.selectedTenantName) {
		        $scope.assetGroup.tenant = null;
		    }
		    if ($scope.selectedAssetGroupComponent) {
		    	$scope.assetGroup.component = $scope.findComponentById($scope.selectedAssetGroupComponent);
		    }
			$scope.savingIndicator = true;
			AssetGroupService.saveAssetGroup(assetGroup).then( function(response) {
				$scope.errors = response.errors;
				$scope.savingIndicator = false;
				if(!$scope.errors || $scope.errors.length === 0){
					$scope.assetGroupForm.$setPristine();
				}
			});
		};
		
		$scope.findComponentById = function(componentId) {
			return $.grep($scope.components, function(n, i) {
			      return n.id == componentId;
			})[0];
		};

		$scope.cancel = function() {
			$scope.actionButton = 'cancel';
			$scope.assetGroupForm.$setPristine();
			$state.transitionTo("assetgroupedit", {assetGroupId: $scope.assetGroup.id});
		};
		
		$scope.returnToSearch = function() {
			$scope.actionButton = 'returnToSearch';
			$state.transitionTo("assetGroupSearch");
		};

  		$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
    		if ($scope.assetGroupForm.$dirty && $scope.actionButton != 'cancel') {
    			if(!confirm("You have unsaved changes. Are you sure you want to leave this page?")){
    				event.preventDefault();
    			}    	
	    	}
  		});

	    $scope.changeTenant = function(newTenant){
   			if(newTenant){
   				$scope.assetGroup.tenant = newTenant;
   				populateAssetPool();
   			}else{
   				$scope.assetGroup.tenant = null;
   			}
   		};

   		function populateAssetPool(){
   			AssetPoolService.loadAssetPool($scope.assetGroup.tenant.id).then(function(loadedData){
    			$scope.assetsFromPool = loadedData.data.assets;
    	  	});
   		};
   		
  		ComponentService.loadAllComponents(500).then(function(loadedData){
  			$scope.components = loadedData.data.searchResults;
  		});

		$scope.$on('$viewContentLoaded', function() {
			if (($scope.assetGroup.component || ($scope.assetGroup.tenant && ($scope.assetGroup.tenant.name || $scope.assetGroup.tenant.type))) && !$scope.assetGroup.id) {
				$scope.assetGroupForm.$setDirty();
			}
		});
  	}
]);
