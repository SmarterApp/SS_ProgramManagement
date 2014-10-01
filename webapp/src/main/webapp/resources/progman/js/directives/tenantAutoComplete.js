progman.directive("tenantAutoComplete", function(TenantService, TenantTypeService) {
    return {
        restrict : "A",
        replace: true,
        scope : {
            tenantModel : '=',
            tenantType : '@',
            onSelect : '&',
            valueAttribute: '@'
        },
        transclude : false,
        templateUrl : 'resources/progman/partials/tenant-auto-complete.html',
        controller : function($scope, $attrs) {
            $scope.filterTenants = function(searchVal, tenantType, pageSize) {
                return TenantService.findTenantsBySearchVal(searchVal, tenantType, '0', pageSize, 'name', 'asc').then(
                        function(loadedData) {
                            return loadedData.data;
                        });
            };
        },
        link : function(scope, element, attrs) {
        	 scope.hasAttribute = false;
             if(attrs.valueAttribute){
             	scope.hasAttribute = true;
             }
        }
    };
});