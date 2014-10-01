
describe('Tenant Type Modal', function() {
  var $scope, $compile, element, template;
  var typeModalScope;
  
  // temporary fix for external template issue
  template = '<div class="popUpBG"></div>' + 

	  '<div data-modal-centered class="popUp tenantTypeSelector highlight">' + 
	      '<h5>Tenant Type Filter</h5>' + 
	      '<div class="fieldGroup">' + 
	          '<ul>' + 
	              '<li>' + 
	                  '<span>' +  
	                      '<select data-ng-model="tenantType" data-ng-options="t for t in tenantTypes" data-modal-select-width-helper>' + 
	                         '<option value="">Select...</option>' + 
	                      '</select>' + 
	                  '</span>' + 
	              '</li>' + 
	          '</ul>' + 
	              
	          '<button data-ng-click="select(tenantType)" class="boxBtn" ><span class="btnIcon icon_sprite icon_save2"></span> <span class="btnText">Filter</span></button>' + 
	          '<button data-ng-click="cancel()" class="boxBtn" ><span class="btnIcon icon_sprite icon_cancel2"></span> <span class="btnText">Cancel</span></button>' + 
	      '</div>' +  
	  '</div>';
  
  
  function compile(data) {
      var el = $compile(data)($scope);
      $scope.$apply();
      return el;
  }

  //you need to indicate your module in a test
  beforeEach(module('progman'));
  
  //beforeEach(module('main/webapp/resources/progman/partials/tenant-type-modal.html'));
 
  beforeEach(inject(function(_$rootScope_, _$compile_, $injector, $templateCache) {
	  
	  $scope = _$rootScope_;
	  $compile = _$compile_;
	  //template = $templateCache.get('main/webapp/resources/progman/partials/tenant-type-modal.html');
	  $templateCache.put('resources/progman/partials/tenant-type-modal.html', template);
	  element = compile('<div tenant-type-modal></div>');
	  typeModalScope = element.isolateScope();
  }));
  
  afterEach(function () {
      element.remove();
  });

  it('should open', function() {
	  expect(typeModalScope.selectedTenantType).toBeUndefined();
	  typeModalScope.tenantType = "STATE";
	  
	  typeModalScope.open();
	  //expect(typeModalScope.selectedTenantType).toBe(2);
  });
  
});

