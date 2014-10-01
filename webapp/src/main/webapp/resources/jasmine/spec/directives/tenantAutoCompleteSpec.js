
describe('Tenant Auto Complete', function() {
  var $scope, $compile, element, template, httpMock;
  var autoCompleteScope, tenants, searchVal, tenantType, pageSize;
  
  // temporary fix for external template issue
  template = '<input type="text" ' + 
	    'placeholder="Select..." ' + 
	        'data-ng-model="tenantModel"' + 
	        'data-typeahead="({true:availableTenant[valueAttribute], false:availableTenant}[hasAttribute]) as availableTenant.name + (availableTenant.description && \' - \' + availableTenant.description || \'\') for availableTenant in filterTenants($viewValue,tenantType,10)"' +  
	        'data-typeahead-wait-ms="200"' +  
	        'data-typeahead-editable="false"' + 
	        'data-typeahead-on-select="onSelect({newTenant:$item,newTenantLabel:$label})" /> ';
  
  searchVal = "wi";
  tenantType = "STATE";
  pageSize = 3;
  
  tenants = [{
	  "id" : "51fee64b46d1c929412e778f",
	  "name" : "Wisconsin",
	  "type" : "STATE",
	  "url" : "/tenant/51fee64b46d1c929412e778f"
  }, {
	  "id" : "6sesrh6erhserheerserh",
	  "name" : "WI",
	  "type" : "STATE",
	  "url" : "/tenant/6sesrh6erhserheerserh"
  }];
  
  function compile(data) {
      var el = $compile(data)($scope);
      $scope.$apply();
      return el;
  }
  
  var mockSearchResponse = { method: "GET", url: "tenantsBySearchVal?searchVal=" + searchVal + "&tenantType=" + tenantType + "&page=0&page.size=" + pageSize, data: tenants };

  //you need to indicate your module in a test
  beforeEach(module('progman'));
  
  //beforeEach(module('main/webapp/resources/progman/partials/tenant-auto-complete.html'));
  
  // Setup the mock service in an anonymous module.
  beforeEach(module(function ($provide) {
	  $provide.value('TenantService', {
		  findTenantsBySearchVal: function (searchVal, tenantType, pageSize) {
				return {
					then: function (callback) {
						callback(mockSearchResponse);
					}
				};
			}
	  });
  }));
 
  beforeEach(inject(function(_$rootScope_, _$compile_, $injector, $templateCache) {
	  httpMock = $injector.get('$httpBackend');
	  $scope = _$rootScope_;
	  $compile = _$compile_;
	  //template = $templateCache.get('main/webapp/resources/progman/partials/tenant-auto-complete.html');
	  httpMock.expectGET(/^template\/typeahead\/typeahead-popup.html/).respond({});
	  $templateCache.put('resources/progman/partials/tenant-auto-complete.html', template);
	  element = compile('<div tenant-auto-complete></div>');
	  autoCompleteScope = element.scope();
  }));
  
  afterEach(function () {
      element.remove();
  });

  it('should filter tenants', inject(function(TenantService) {
	  TenantService.findTenantsBySearchVal(searchVal, tenantType, pageSize).then(function(response) {
		  expect(response.method).toEqual("GET");
		  expect(response.url).toEqual("tenantsBySearchVal?searchVal=wi&tenantType=STATE&page=0&page.size=3");
		  expect(response.data).toEqual(tenants);
	  });
  }));
  
});

