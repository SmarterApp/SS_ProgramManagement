
describe('Expandable', function() {
  var $scope, $compile, element, template;
  var expandableScope, assets;
  
  function compile(data) {
      var el = $compile(data)($scope);
      $scope.$apply();
      return el;
  }

  //you need to indicate your module in a test
  beforeEach(module('progman'));
  
  beforeEach(inject(function(_$rootScope_, _$compile_, $injector) {
	  $scope = _$rootScope_;
	  $compile = _$compile_;
	  element = compile('<div expandable></div>');
	  expandableScope = element.scope();
  }));
  
  afterEach(function () {
      element.remove();
  });

  it('should toggle', function() {
	  expect(expandableScope.expanded).toBeFalsy();
	  expect(expandableScope.iconClass).toBe("plusMin expander-closed");
	  
	  expandableScope.toggle();
	  expect(expandableScope.expanded).toBeTruthy();
	  expect(expandableScope.iconClass).toBe("plusMin expander-open");
  });
  
});

