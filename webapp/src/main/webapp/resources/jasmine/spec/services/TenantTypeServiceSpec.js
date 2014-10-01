describe('Tenant Type Service', function($injector_) {
  var httpMock;
  var $injector;
  
  var mockedLoadAllData = { method: "GET", url: "/tenantTypes/" };
  
  //you need to indicate your module in a test
  beforeEach(module('progman'));
  
  // Setup the mock service in an anonymous module.
  beforeEach(module(function ($provide) {
	  $provide.value('TenantTypeService', {
		loadAllTenantTypes: function () {
			return {
				then: function (callback) {
					callback(mockedLoadAllData);
				}
			};
		}
	  });
  }));
  
  beforeEach(inject(function(_$injector_) {
	  $injector = _$injector_;
	  httpMock = $injector.get('$httpBackend');
  }));
  
  it('load all tenant types', inject(function(TenantTypeService) {
	  TenantTypeService.loadAllTenantTypes().then(function(response) {
		  expect(response.method).toEqual("GET");
		  expect(response.url).toEqual("/tenantTypes/");
	  });
  }));
  
});

