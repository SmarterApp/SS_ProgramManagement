describe('Tenant Service', function($injector_) {
  var baseUrl;
  var httpMock;
  var $injector;

  var tenant = {
    	  "id" : "51fee64b46d1c929412e778f",
    	  "name" : "Wisconsin",
    	  "type" : "STATE",
    	  "url" : "/tenant/51fee64b46d1c929412e778f"
  };
  
  var searchVal = "wi";
  var mockedSaveData = { method: "POST", data: tenant, url: "/tenant/" + tenant.id };
  var mockedLoadData = { method: "GET", data: tenant, url: "/tenant/" + tenant.id };
  var mockedLoadAllData = { method: "GET", data: tenant, url: "/tenant/" };
  var mockedSearchData = { method: "GET", url: "tenantsBySearchVal?searchVal=" + searchVal };
  var mockedChainData = { method: "GET", data: tenant, url: "tenantchain" };
  
  //you need to indicate your module in a test
  beforeEach(module('progman'));
  
  // Setup the mock service in an anonymous module.
  beforeEach(module(function ($provide) {
	  $provide.value('TenantService', {
			saveTenant: function () {
				return {
					then: function (callback) {
						callback(mockedSaveData);
					}
				};
			},
		loadTenant: function () {
			return {
				then: function (callback) {
					callback(mockedLoadData);
				}
			};
		},
		loadAllTenants: function () {
			return {
				then: function (callback) {
					callback(mockedLoadData);
				}
			};
		},
		findTenantsBySearchVal: function () {
			return {
				then: function (callback) {
					callback(mockedSearchData);
				}
			};
		},
		loadTenancyChain: function () {
			return {
				then: function (callback) {
					callback(mockedChainData);
				}
			};
		}
	  });
  }));
  
  beforeEach(inject(function(_$injector_) {
	  $injector = _$injector_;
	  httpMock = $injector.get('$httpBackend');
  }));
  
  it('save tenant', inject(function(TenantService) {
	  TenantService.saveTenant(tenant).then(function(response) {
		  expect(response.method).toEqual("POST");
		  expect(response.data).toEqual(tenant);
		  expect(response.url).toEqual(tenant.url);
	  });
  }));
  
  it('load tenant', inject(function(TenantService) {
	  TenantService.loadTenant(tenant).then(function(response) {
		  expect(response.method).toEqual("GET");
		  expect(response.data).toEqual(tenant);
		  expect(response.url).toEqual(tenant.url);
	  });
  }));
  
  it('load all tenants', inject(function(TenantService) {
	  TenantService.loadAllTenants(tenant).then(function(response) {
		  expect(response.method).toEqual("GET");
		  expect(response.data).toEqual(tenant);
		  expect(response.url).toEqual(tenant.url);
	  });
  }));
  
  it('find tenants by search value', inject(function(TenantService) {
	  TenantService.findTenantsBySearchVal(searchVal).then(function(response) {
		  expect(response.method).toEqual("GET");
		  expect(response.url).toEqual("tenantsBySearchVal?searchVal=" + searchVal);
	  });
  }));
  
  it('load tenancy chain', inject(function(TenantService) {
	  TenantService.loadTenancyChain(tenant).then(function(response) {
		  expect(response.method).toEqual("GET");
		  expect(response.url).toEqual("tenantchain");
	  });
  }));
  
});

