progman.controller('AssetPoolEditController',['$scope','$state', 'loadedData','AssetPoolService', 'TenantService', 'TenantTypeService',
    function($scope, $state,  loadedData, AssetPoolService, TenantService, TenantTypeService) {

		$scope.assetPool = loadedData.data;
   		$scope.errors = loadedData.errors;
   		$scope.actionButton = '';
   		$scope.assets = [];
   		
   		$scope.reloadTenantPool = function(){
   			   //load asset pool for tenant 
				AssetPoolService.loadAssetPool($scope.tenant.id).then(function(response){
					if(response.data){
						$scope.setActivePool(response.data);
					}else{
						var assetPool = {"name":"Asset Pool for " + $scope.tenant.name, "tenantId": $scope.tenant.id,"assets":[]};
						AssetPoolService.saveAssetPool(assetPool).then(function(response){
							$scope.setActivePool(response.data);
						});
					}
		  		});
   		};
   		
   		$scope.changeTenant = function(newTenant){
   			if(newTenant){
   				$scope.tenant = newTenant;
   				$scope.reloadTenantPool();
   			}else{
   				$scope.tenant = null;
   			}
   		};
   		   		
   		$scope.deleteItemFromPool = function(assetId){
   			AssetPoolService.deleteAssetFromPool($scope.assetPool.id, assetId).then(function(response){
   				$scope.reloadTenantPool();
			});
   		};

   		$scope.setActivePool = function(poolData) {
   			$scope.assetPool = poolData;
   			$scope.assets = $scope.assetPool.assets;
			$scope.options = { 
				url: baseUrl + 'assetPool/' +  $scope.assetPool.id  + '/assetFile',
				sequentialUploads: true,
                handleResponse: function (e, data) {
                     if (data.errorThrown || data.textStatus === 'error' || data.result.messages) {
                         var message = data.result ? " - " + data.result.messages['applicationErrors'] : " upload error";  
                         data.files[0].error = (data.errorThrown || data.textStatus) + message;
                     }  else {
                    	var uploadedAsset = data.result;
                    	for(var i = 0; i < data.files.length; i++){
                    		var indexToRemove = null;
                    		for(var a = 0; a < $scope.queue.length; a++){
                    			if($scope.queue[a].$$hashKey === data.files[i].$$hashKey){
                    				indexToRemove = a;
                    			}
                    		}
                    		if(indexToRemove != null){
                    			$scope.queue.splice(indexToRemove,1);
                    		}
                    	}
                    	$scope.assets.push(uploadedAsset);
                    	$scope.uploadSuccessMessage = "File(s) uploaded successfully.";
                    }
                }
			};
		};
		
		$scope.cancel = function() {
			$scope.actionButton = 'cancel';
			$state.transitionTo("assetGroupSearch");
		};
		
  		$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
    		if ($scope.queue.length > 0 && $scope.actionButton != 'cancel') {
    			if(!confirm("Your image has not been uploaded. Are you sure you want to leave this page?")){
    				event.preventDefault();
    			}    	
	    	}
  		});
	}]);
