
describe('Searchable', function() {
  var $scope, $compile, element, searchTemplate, pageTemplate;
  var searchableScope, pageableScope, searchParams, searchResponse;
  
  // temporary fix for external template issue
  searchTemplate = '<div data-ng-repeat="error in errors">' + 
	   '<div><span class="icon_sprite icon_error error"></span>{{error}}</div>' + 
	   '</div>' + 
	   '<div data-ng-transclude></div>';
  
  pageTemplate = '<div data-ng-transclude></div>' + 
	  '<div id="tableNav" class="dataTable ">' + 
	'<table>' + 
		'<tr>' + 
		'<th>' + 
			'Total results found: {{pagingInfo.totalCount}}' + 
		'</th>' + 
		'<th>' + 
			'<ul class="tablePage">' + 
			    '<li data-ng-show="pagingInfo.prevPageUrl" data-ng-click="firstPage()"><span class="tbNav tbfirst"></span> First</li>' + 
			 	'<li data-ng-show="pagingInfo.prevPageUrl" data-ng-click="prevPage()"><span class="tbNav tbprev"></span> Previous</li>' + 
			 	'<li>Page: <input type="text" data-ng-change="changePage()" data-ng-model="searchParams.currentPage"/></li>' + 
			 	'<li data-ng-show="pagingInfo.nextPageUrl" data-ng-click="nextPage()">Next <span class="tbNav tbnext"></span></li>' + 
			 	'<li data-ng-show="pagingInfo.nextPageUrl" data-ng-click="lastPage()">Last <span class="tbNav tblast"></span></li>' + 
			 '</ul>' + 
		'</th>' + 
		'</tr>' + 
	'</table>' + 
'</div>';
  
  
  function compile(data) {
      var el = $compile(data)($scope);
      $scope.$apply();
      return el;
  }

  //you need to indicate your module in a test
  beforeEach(module('progman'));
  
  //beforeEach(module('main/webapp/resources/progman/partials/searchable.html'));
  //beforeEach(module('main/webapp/resources/progman/partials/pageable-table.html'));
  
  // Setup the mock service in an anonymous module.
  beforeEach(module(function ($provide) {
	  $provide.value('$http', {
		  searchParams: searchParams,
		  searchResponse: searchResponse
	  });
  }));
 
  beforeEach(inject(function(_$rootScope_, _$compile_, $injector, $templateCache) {
	  
	  searchParams = {
		  "currentPage": 0
	  };
	  
	  searchResponse = {
		  "searching": true
	  };
	  
	  $scope = _$rootScope_;
	  $compile = _$compile_;
	  //template = $templateCache.get('main/webapp/resources/progman/partials/searchable.html');
	  $templateCache.put('resources/progman/partials/searchable.html', searchTemplate);
	  element = compile('<div searchable></div>');
	  searchableScope = element.scope();
	  //searchableScope.searchParams = {};
	  //searchableScope.searchResponse = searchResponse;
  }));
  
  afterEach(function () {
      element.remove();
  });
  
  xit('should search', function() {
//	  searchableScope.search();
  });


  describe('Pageable', function() {
	  beforeEach(inject(function($injector, $templateCache) {
		  //template = $templateCache.get('main/webapp/resources/progman/partials/pageable-table.html');
		  $templateCache.put('resources/progman/partials/pageable-table.html', pageTemplate);
		  element = compile('<div pageable></div>');
		  pageableScope = element.scope();
	  }));
	  
	  xit('should next page', function() {
//		  pageableScope.nextPage();
	  });
  });
  
});

