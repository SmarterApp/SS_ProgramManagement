progman.controller('NavigationController', ['$scope','$location','$state','NavigationService',
     function NavigationController($scope,$location,$state, NavigationService) {
	 	$scope.navLinks = NavigationService.getNavLinks();
	 	
		$scope.navigate = function(navLink){
			$state.transitionTo(navLink.stateName);
		};

	 }
   ]);