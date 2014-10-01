progman.controller('TenantEditController',['$scope','$state', 'loadedData', 'TenantService', 'TenantTypeService',
    function($scope, $state, loadedData, TenantService, TenantTypeService) {
		$scope.savingIndicator = false;
		$scope.errors = loadedData.errors;
		$scope.tenant = loadedData.data;
		$scope.actionButton = '';
		$scope.formAction = 'Add';

		if($scope.tenant && $scope.tenant.id){
			$scope.formAction = 'Edit';
		}
   		TenantTypeService.loadAllTenantTypes().then(function(loadedData) {
   			$scope.tenantTypes = loadedData.data;
  		});

		$scope.save = function(tenant){
			$scope.savingIndicator = true;
			//tenant = $scope.validateDates(tenant);

			TenantService.saveTenant(tenant).then(function(response){
				$scope.savingIndicator = false;
				$scope.errors = response.errors;
				if($scope.errors.length === 0){
					$scope.tenantForm.$setPristine();
					$scope.tenant = response.data;
				}
			});
		};

		$scope.cancel = function() {
			$scope.actionButton = 'cancel';
			$scope.tenantForm.$setPristine();
			$state.transitionTo("tenantedit", {tenantId:$scope.tenant.id});
		};
		
		$scope.returnToSearch = function() {
			$scope.actionButton = 'returnToSearch';
			$state.transitionTo("tenantsearch");
		};
		
		$scope.validateDates = function(tenant) {
			angular.forEach(tenant.tenantSubscriptions, function(subscription, index) {
				if(typeof subscription.effectiveDate === 'undefined') {
					tenant.tenantSubscriptions[index].effectiveDate = "INVALID_DATE";
				}
				
				if(typeof subscription.expirationDate === 'undefined') {
					tenant.tenantSubscriptions[index].expirationDate = "INVALID_DATE";
				}
			});
			
			return tenant;
		};
		
  		$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    		if ($scope.tenantForm.$dirty && $scope.actionButton != 'cancel') {
    			if(!confirm("You have unsaved changes. Are you sure you want to leave this page?")){
    				event.preventDefault();
    			}
	    	}
  		});
  		
		$scope.$on('$viewContentLoaded', function() { 
			if (($scope.tenant.name || $scope.tenant.type) && !$scope.tenant.id) {
				$scope.tenantForm.$setDirty();
			}
		});
		
	}]);

