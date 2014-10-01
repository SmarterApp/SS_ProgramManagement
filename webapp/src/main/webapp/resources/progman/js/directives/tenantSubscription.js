progman.directive("tenantsubscriptioneditor", function(ComponentService, $timeout) {
	return {
		restrict:"A",
		scope: true,
		templateUrl: 'resources/progman/partials/tenantSubscription-editor.html',
		controller: function($scope, $attrs) {
			
			$scope.selectedCellId = "subscribe0";
			
			//========Datepicker Settings==============
			$scope.clearEffectiveDate = function(effectiveDate, componentId) {
  				for(var sub = 0; sub < $scope.tenant.tenantSubscriptions.length; sub++) {
  					if(effectiveDate && $scope.tenant.tenantSubscriptions[sub].component.id == componentId) {
						$scope.tenant.tenantSubscriptions[sub].effectiveDate = null;
						$scope.tenantForm.$dirty = true;
  					}
  				}
			};
			
			$scope.clearExpirationDate = function(expirationDate, componentId) {
  				for(var sub = 0; sub < $scope.tenant.tenantSubscriptions.length; sub++) {
  					if(expirationDate && $scope.tenant.tenantSubscriptions[sub].component.id == componentId) {
						$scope.tenant.tenantSubscriptions[sub].expirationDate = null;
						$scope.tenantForm.$dirty = true;
  					}
  				}
			};
			//=========================================
		  
			if(!$scope.unsubscribed) {
				$scope.unsubscribed = [];
			}
			
			if(!$scope.subscriptionIndexMap) {
				$scope.subscriptionIndexMap = {};
			}
			
	   		ComponentService.loadAllComponents(500).then(function(componentData){
	  			$scope.components = componentData.data.searchResults;
	  	   		angular.forEach($scope.components, function(component,compIndex) {
		  	   		var subscriptionFound = false;
	  	 			if($scope.tenant.tenantSubscriptions) {
	  	  	  	   		angular.forEach($scope.tenant.tenantSubscriptions, function(subscription,subIndex) {
	  	  	  	   			if(subscription.component.id == component.id){
	  	  	  	   				$scope.unsubscribed.push({'subscribe':true,'component':subscription.component, 'inGoodStanding':subscription.inGoodStanding, 'effectiveDate':subscription.effectiveDate, 'expirationDate':subscription.expirationDate});
	  	  	  	   				$scope.subscriptionIndexMap[compIndex] = subIndex;
	  	  	  	   				subscriptionFound=true;
	  	  	  	   			}
	  	  	  		    });

	  	  			}
	  	 			if(!subscriptionFound) {
	  	  				$scope.unsubscribed.push({'subscribe':false,'component':component, 'inGoodStanding':false});
	  	  			}
	  	   		});
	   		});
	   		
	   		$scope.buildSubscriptionIndexMap = function() {
	   			$scope.subscriptionIndexMap = {};
	  	   		angular.forEach($scope.components, function(component,compIndex) {
	  	 			if($scope.tenant.tenantSubscriptions) {
	  	  	  	   		angular.forEach($scope.tenant.tenantSubscriptions, function(subscription,subIndex) {
	  	  	  	   			if(subscription.component.id == component.id){
	  	  	  	   				$scope.subscriptionIndexMap[compIndex] = subIndex;
	  	  	  	   			}
	  	  	  		    });
	  	  			}
	  	   		});
	   		};

			$scope.addRemoveSubscription = function(unsubscribe, component, index) {
  				if(!$scope.tenant.tenantSubscriptions) {
  					$scope.tenant.tenantSubscriptions =[];
  				}
  				if(!unsubscribe) {
  					$scope.subscriptionIndexMap[index] = $scope.tenant.tenantSubscriptions.length;
  					$scope.tenant.tenantSubscriptions.push({'component':component, 'inGoodStanding':true});
  					$scope.unsubscribed[index].inGoodStanding.disabled="enabled";
  					$scope.unsubscribed[index].inGoodStanding = true;
  				} else {
  		  	   		angular.forEach($scope.tenant.tenantSubscriptions, function(subscription,i) {
  		  	   			if(subscription && subscription.component.id == component.id) {
  		  	   				$scope.tenant.tenantSubscriptions.splice(i,1);
  		  	   				$scope.buildSubscriptionIndexMap();
  		  					$scope.unsubscribed[index].inGoodStanding.disabled="disabled";
  		  					$scope.unsubscribed[index].inGoodStanding = false;
  		  	   			}
  		  		    });
  				}
  			};
  			
  			// set the first element in the table to be tabable
  			$timeout(function() {
  				if(document.getElementById($scope.selectedCellId) != null) {
  	  	   			document.getElementById($scope.selectedCellId).setAttribute("tabindex", "0");
  				}
  			}, 400);
        },
	};
});

