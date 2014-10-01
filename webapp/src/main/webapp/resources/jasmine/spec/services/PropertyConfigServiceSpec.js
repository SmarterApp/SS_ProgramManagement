describe('Property Config Service', function($injector_) {
  var httpMock;
  var $injector;
  var propConfigService;

  var propertyConfig = {
		  "id" : "rs89ser7erh789sesetetjs",
    	  "name" : "testProps",
    	  "envName" : "qa"
  };
  
  
  //you need to indicate your module in a test
  beforeEach(module('progman'));
  
  // Setup the mock service in an anonymous module.
  beforeEach(module(function ($provide) {
	  return $provide.decorator('$state', function () {
          return {
              transitionTo: function (path) {
                  return {};
              }
          };
      });
  }));
  
  beforeEach(inject(function(PropertyConfigService, _$injector_) {
	  $injector = _$injector_;
	  httpMock = $injector.get('$httpBackend');
	  propConfigService = PropertyConfigService;
  }));
  
  it('save property config', inject(function(PropertyConfigService) {
	  httpMock.expectPUT(/propertyConfig\/rs89ser7erh789sesetetjs/).respond(201, propertyConfig);
	  
	  var returnedPromise = propConfigService.savePropertyConfig(propertyConfig);
	  returnedPromise.then(function(response) {
		  expect(response.data).toEqual(propertyConfig);
		  expect(response.errors).toEqual([]);
	  });
	  httpMock.flush();
  }));
  
  it('load property config', inject(function(PropertyConfigService) {
	  httpMock.expectGET(/propertyConfig\/rs89ser7erh789sesetetjs/).respond(propertyConfig);
	  var returnedPromise = propConfigService.loadPropertyConfig(propertyConfig.id);
	  returnedPromise.then(function(response) {
		  expect(response.errors).toEqual([]);
		  expect(response.data).toEqual(propertyConfig);
	  });
	  httpMock.flush();
  }));
  
  it('delete property config', inject(function(PropertyConfigService) {
	  httpMock.expectDELETE(/propertyConfig\/rs89ser7erh789sesetetjs/).respond(204,null);
	  var returnedPromise = propConfigService.deletePropertyConfig(propertyConfig.id);
	  returnedPromise.then(function(response) {
		  expect(response.errors).toEqual([]);
		  expect(response.data).toBeNull();
	  });
	  httpMock.flush();
   }));
  
});

