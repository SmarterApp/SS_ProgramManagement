progman.directive("mapvalueeditor", function(focus, $timeout){
	return {
		restrict:"A",
		scope:{
			properties:'=',
			formName:'=',
			selectedCellId:'='
		},
		templateUrl: 'resources/progman/partials/map-editor.html',
		controller: function($scope, $attrs) {
			$scope.selectedCellId = "encrypt0";
			$scope.editor = "form";
			$scope.$watch('editor', toggleMe);
			
			function toggleMe(){
				 if($scope.editor=="propertyFile") {
					var asText="";
					for(var i in $scope.properties) {
						asText += ($scope.properties[i].encrypt ? 'encrypt:' : '') + $scope.properties[i].propertyKey + '=' + $scope.properties[i].propertyValue + '\n';
					}
					$scope.textProperties = asText;
				}
			};
			
			$scope.$watch('textProperties', parsePropertiesFromText);
			
			function parsePropertiesFromText() {
				if($scope.textProperties){
					var keyValuePairs = $scope.textProperties.split("\n");
					var props = [];
					for(var index in keyValuePairs){
						if(keyValuePairs[index]){
							var regexResult = /^((.*)encrypt:)?(.*?)=(.*)$/.exec(keyValuePairs[index]);
							if(regexResult){
								props.push({'encrypt':regexResult[1] == 'encrypt:' ? true : false, 'propertyKey':regexResult[3], 'propertyValue':regexResult[4]});
							}
						}
					}
					$scope.properties = props;
				}
			};
			
			$scope.removeMapValue = function (index) {
				$scope.properties.splice(index,1);
				$scope.formName.$dirty=true;
			};

			$scope.addItem = function(){
				if(!$scope.properties){
 					$scope.properties=[];
 				}
  				if(document.getElementById($scope.selectedCellId) != null) {
  	  	   			document.getElementById($scope.selectedCellId).setAttribute("tabindex", "-1");
  				}
				var tempProps = [];
				tempProps.push({"propertyKey":"", "propertyValue":"", "encrypt":false});
				$scope.properties = tempProps.concat($scope.properties);
				$scope.formName.$dirty=true;
	  			$timeout(function() {
	  				if(document.getElementById("encrypt0") != null) {
	  	  	   			document.getElementById("encrypt0").setAttribute("tabindex", "0");
	  	  	   			$scope.selectedCellId = "encrypt0";
	  				}
	  			}, 400);
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