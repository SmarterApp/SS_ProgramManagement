/*jshint smarttabs: true */

progman.directive("searchable",['$http','$parse', function($http, $parse){
	return {
		restrict:"A",
		scope:{
			searchUrl:'@',
			searchParams:'=',
			searchResponse:'=',
			searchParamsPreprocess : '&',
			broadcastSignal:'@'
		},
		transclude :true,
		templateUrl: 'resources/progman/partials/searchable.html',
		controller: function($scope, $attrs) {
			this.search = function(searchParams){
			    $scope.searchParamsPreprocess();
				$scope.searchResponse.searching = true;
				var url = $scope.$eval($attrs.searchUrl) + '/?_=' + Math.random();
				//make sure we have a valid number
				var pageNum = (searchParams.currentPage+'').replace(/\D/g, '') *1;
				searchParams.currentPage = pageNum > 0 ? pageNum:1;
				var params = JSON.parse(JSON.stringify(searchParams));
				params.currentPage = params.currentPage -1;
				$http.get(baseUrl + url, {params:params}).success(function(data) {
					$scope.errors =[];
					$scope.searchResponse = data;
					$scope.searchResponse.currentPage = ($scope.searchResponse.currentPage *1) +1;
					var tCount = $scope.searchResponse.totalCount*1;
					var pSize = $scope.searchResponse.pageSize*1;
					var lPage = parseInt(tCount / pSize);
					$scope.searchResponse.lastPage = tCount % pSize > 0 ? lPage + 1 : lPage;
				}).error(function (data, status, headers, config) {
					$scope.errors =[];
					for(var field in data.messages){
						for(var messages in data.messages[field]){
							$scope.errors.push(data.messages[field][messages]);
						}
					}
					$scope.searchResponse.searching = false;
					return status;
					});	
			};
			
			this.changePage = function(){
				this.search($scope.searchParams);
			};
			
			this.filterChange = function(){
				$scope.searchParams.currentPage = 1;
				this.search($scope.searchParams);
			};
			
			this.clearFilter = function(){
				$scope.searchParams = {};
				$scope.searchParams.currentPage = 1;
				this.search($scope.searchParams);
			};
			
			this.sortChange = function(sortKey, element){
				element.parent().children().removeClass("headerSortDown headerSortUp");
		        if ($scope.searchParams.sortKey == sortKey && $scope.searchParams.sortDir == "asc") {
		        	 $scope.searchParams.sortDir = "desc";
		        	 element.addClass('headerSortDown');
		        } else if ($scope.searchParams.sortKey == sortKey && $scope.searchParams.sortDir == "desc") {
		        	 $scope.searchParams.sortDir = "asc";
		        	 element.addClass('headerSortUp');
		        } else {
		        	 $scope.searchParams.sortKey = sortKey;
		        	 $scope.searchParams.sortDir = "asc";
		        	 element.addClass('headerSortUp');
		        }
				this.search($scope.searchParams);
			};
			
			$scope.search = this.search;
			if ($scope.broadcastSignal) {
			    $scope.$on($scope.broadcastSignal, function() {
	                $scope.search($scope.searchParams);
	            }); 
			}
			this.search($scope.searchParams);
		},
		link:function(scope, element, attrs){
			
		}
	};
}]);


progman.directive("clearAndSearchOnClick", function(){
	return {
		restrict:"A",
		require:"^searchable",
		scope:{
			activeIndicator:'='
		},
		transclude:false,
		link : function(scope, element, attrs, searchableController) {
			element.bind("click", function(){
				searchableController.clearFilter();
			});
		}
	};
});

progman.directive("searchOnClick", function(){
	return {
		restrict:"A",
		require:"^searchable",
		scope:{
			activeIndicator:'='
		},
		transclude:false,
		link : function(scope, element, attrs, searchableController) {
			element.bind("click", function(){
				searchableController.filterChange();
			});
		}
	};
});

progman.directive("searchOnChange", function(){
	return {
		restrict:"A",
		require:"^searchable",
		scope:{
			setParams:'&'
		},
		transclude:false,
		link : function(scope, element, attrs, searchableController) {
			element.bind("change", function(){
				if(angular.isDefined(scope.setParams) && scope.setParams()){
					searchableController.setFilter(scope.setParams());
				}
				searchableController.filterChange();
			});
		}
	};
});

progman.directive("sortOnClick", function(){
	return {
		restrict:"A",
		require:"^searchable",
		transclude:false,
		link:function(scope, element, attrs, searchableController){
			element.bind('mouseenter', function(){
	            element.addClass('columnHover');
	        })
	        .bind('mouseleave', function(){
	        	element.removeClass('columnHover');
	        })
			.bind("click", function(){
				searchableController.sortChange(attrs.sortColumn, element);
			});	
		}
	};
});

progman.directive("pageable", function(){
	return {
		restrict:"A",
		transclude :true,
		require:"^searchable",
		scope:{
            pagingInfo:'=',
            searchParams:'=',
            changePage:'&'
		},
		templateUrl: 'resources/progman/partials/pageable-table.html',
		controller: function($scope, $attrs) {
			$scope.nextPage = function(){
				$scope.searchParams.currentPage = $scope.searchParams.currentPage + 1;
				$scope.changePage();
			};
			$scope.prevPage = function(){
				$scope.searchParams.currentPage = $scope.searchParams.currentPage - 1;
				$scope.changePage();
			};
			$scope.lastPage = function(){
				$scope.searchParams.currentPage = $scope.pagingInfo.lastPage;
				$scope.changePage();
			};
			$scope.firstPage = function(){
				$scope.searchParams.currentPage = 0;
				$scope.changePage();
			};
            $scope.totalPages = function(totalRecords, pageSize) {
            	return Math.ceil(totalRecords / pageSize);
            };
        },
		link:function(scope, element, attrs, searchableCtrl){
			scope.changePage = function() {
				searchableCtrl.changePage();
			};
		}
	};
});
