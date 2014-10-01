describe('PropertyConfig List Controller ', function() {
  var $scope, propertyConfigService, httpMock = null;
  
  
  var savedPropertyConfig = {
		  "id" : "rs89ser7erh789sesetetjs",
    	  "name" : "testProps",
    	  "envName" : "qa"
  };
  
  //you need to indicate your module in a test
  beforeEach(module('progman'));
 
  beforeEach(inject(function($rootScope, $controller, $injector, $state, $http, PropertyConfigService) {
	  
	    //create a scope object for us to use.
	    $scope = $rootScope.$new();
	    httpMock = $injector.get('$httpBackend');
	    //respond nothing for templates....
	    httpMock.whenGET(/\.html/).respond("");
	    
	    propertyConfigService = PropertyConfigService;
	    foo = $rootScope
	    
	    listController = $controller('PropertyConfigListController', {
		      $scope : $scope,
	    });

	    var mockForm = {};
	    mockForm.$setPristine = function(){};
	    $scope.propertyConfigForm = mockForm;
	    
  }));

  
  it('delete asset group deny confirm', function() {
	  //routes to edit page on successful create call
	  httpMock.whenDELETE(/^propertyConfig\/rs89ser7erh789sesetetjs/).respond(null);
	  
	  spyOn(propertyConfigService, "deletePropertyConfig").andCallThrough();
	  spyOn(window, "confirm").andReturn(false),
	  $scope.remove(savedPropertyConfig);
	  expect(propertyConfigService.deletePropertyConfig).not.toHaveBeenCalled();
	  
  });
  
  it('delete asset group', function() {
	  //routes to edit page on successful create call
	  httpMock.expectDELETE(/^propertyConfig\/rs89ser7erh789sesetetjs/).respond(null);
	  
	  spyOn(propertyConfigService, "deletePropertyConfig").andCallThrough();
	  spyOn(window, "confirm").andReturn(true),
	  
	  $scope.remove(savedPropertyConfig);
	  
	  expect(propertyConfigService.deletePropertyConfig).toHaveBeenCalled();  
	  
  });
  
});

