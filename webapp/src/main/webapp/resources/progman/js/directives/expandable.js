progman.directive("expandable", function(){
	return {
		restrict:"A",
		transclude :false,
		controller: function($scope, $attrs) {
			$scope.expanded = false;
			$scope.iconClass='plusMin expander-closed';
			$scope.toggle = function() {
				$scope.expanded = !$scope.expanded;
				if($scope.expanded){
					$scope.iconClass = "plusMin expander-open";
				}else{
					$scope.iconClass = "plusMin expander-closed";
				}	
			};
			
			$scope.keyToggle = function(event) {
				if(event.keyCode == 13) {
					$scope.toggle();
				}
			};
			
		},
		link:function(scope, element, attrs){

		}
	};
});