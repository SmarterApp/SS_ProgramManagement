
progman.directive("assetvalueeditor", function($timeout){
	return {
		restrict:"A",
		scope:{
			assets:'=',
			assetsFromPool:'=',
			formName:'=',
			baseUrl:'='
		},
		templateUrl: 'resources/progman/partials/asset-editor.html',
		controller: function($scope, $attrs) {	
			$scope.selectedCellId = "assetName0";
			$scope.highlighted = -1;
			$scope.assetPoolVisible = false;
			
			$scope.removeAssetValue = function (index) {
				$scope.assets.splice(index,1);
				$scope.formName.$dirty=true;
			};
			
			$scope.searchFromPool = function (index) {
				$scope.highlighted = index;
				$scope.assetPoolVisible = true;
			};
			
			$scope.useMe = function () {
				$scope.assets[$scope.highlighted].property = $scope.selectedPoolAsset.property;
				$scope.assets[$scope.highlighted].assetFileGridId = $scope.selectedPoolAsset.assetFileGridId;
				$scope.assets[$scope.highlighted].assetFileName = $scope.selectedPoolAsset.assetFileName;
				$scope.cancel();
			};
			
			$scope.cancel = function () {
				$scope.assetPoolVisible = false;
				$scope.highlighted = -1;
				$scope.selectedPoolAsset = null;
			};
			
			$scope.addItem = function(){
				if(!$scope.assets){
					$scope.assets=[];
				}
				$scope.assets.push({"name":"", "type":"PROPERTY", "property":"", "assetFile":""});
			};
			
  			// set the first element in the table to be tabable
  			$timeout(function() {
  				if(document.getElementById($scope.selectedCellId) != null) {
  	  	   			document.getElementById($scope.selectedCellId).setAttribute("tabindex", "0");
  				}
  			}, 400);
			
        },
		link:function(scope, element, attrs){
		
		}
	};
});

