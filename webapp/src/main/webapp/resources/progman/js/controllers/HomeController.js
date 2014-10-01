progman.controller('HomeController', ['$scope','$location', 'VersionService',
     function HomeController($scope,$location,VersionService) {
    
        VersionService.getBuildInfo().then(function(response) {
            $scope.buildInfo = response.data;
        });
    
	    $scope.go = function(path){
	    	var pathMapping = {
	    			"/tenantSearch":".manageTenants",
	    			"/componentSearch":".manageComponents",
	    			"/propertyConfigSearch":".configProperties",
	    			"/assetPoolEditor/":".uploadBranding",
	    			"/assetGroupSearch":".configBranding",
	    			"/skinnable":".previewBranding"
	    	};
			$('.slide-menu').show();
			$('.menuli.selected').removeClass('selected');
			$(pathMapping[path]).addClass('selected');
			$location.path(path);
		};
		
		$scope.goEnter = function(event, path) {
			if(event.keyCode === 13) {
				$scope.go(path);
			};
		};
	 }
   ]);