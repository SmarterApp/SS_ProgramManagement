describe('AssetPool Edit Controller ', function() {
  var $scope, assetPoolController, tenantTypeService, assetPoolService, assetPoolServiceMock, tenantTypeServiceMock = null;
  
  var tenant = {
    	  "id" : "51fee64b46d1c929412e778f",
    	  "name" : "Wisconsin",
    	  "type" : "STATE",
    	  "url" : "/tenant/51fee64b46d1c929412e778f"
  };
  
  var mnTenant = {
    	  "id" : "7898ts67d67h67sdh67sdg67h67",
    	  "name" : "Minnesota",
    	  "type" : "STATE",
    	  "url" : "/tenant/7898ts67d67h67sdh67sdg67h67"
  };
  
  var assetPool = {
    	  "id" : "7df8s7s67zsdgh67sdxdf67hhx",
    	  "tenantId" : "51fee64b46d1c929412e778f",
    	  "name" : "Asset Pool for Wisconsin",
    	  "assets" : [ {
	    	    "name" : null,
	    	    "type" : null,
	    	    "property" : "/assetPool/assetFile/520e50967b02f5c3eb7d048c/keanu-reeves-cheer-up.png",
	    	    "assetFileGridId" : "520e50967b02f5c3eb7d048c",
	    	    "assetFileName" : "keanu-reeves-cheer-up.png",
	    	    "fileContentType" : "image/jpeg",
	    	    "basePath" : "http://localhost:8089/prog-mgmnt.rest",
	    	    "url" : "http://localhost:8080/prog-mgmnt.rest/assetPool/assetFile/520e50967b02f5c3eb7d048c/keanu-reeves-cheer-up.png"
	    	  }],
    	  "url" : "/assetPool/7df8s7s67zsdgh67sdxdf67hhx"
  };
  
  var tenantTypes = { "data": [{
	  "typeName": "type 1",
	  "rank": "1"
  }, {
	  "typeName": "type 2",
	  "rank": "2"
  }]};
  
  var tenantList = [];
  tenantList.push(tenant);
  tenantList.push(mnTenant);
  
  //you need to indicate your module in a test
  beforeEach(module('progman'));
 
  beforeEach(inject(function($rootScope, $controller, $injector, $state, $http, TenantTypeService, AssetPoolService) {
	    //create a scope object for us to use.
	    $scope = $rootScope.$new();
	    httpMock = $injector.get('$httpBackend');
	    
	    tenantTypeService = TenantTypeService;
	    assetPoolService = AssetPoolService;
	    
	    assetPoolServiceMock = {
	    		loadAssetPool: function() {

                },
	    		saveAssetPool: function() {

                }
           };
	    
	    tenantTypeServiceMock = {
	    		loadAllTenantTypes: function(tenantTypes) {
	    			tenantTypes.data;
                }
           };
	    
	    //respond nothing for templates....
	    httpMock.whenGET(/\.html/).respond("");
	    
	    //tenants is called to load selectbox
	    httpMock.whenGET(/^tenant\/51fee64b46d1c929412e778f/).respond(tenant);
	    
	    httpMock.whenGET(/^assetPool\/tenant\/51fee64b46d1c929412e778f/).respond({
	    	  "id" : "520d40607b023b2cc54dd3e9",
	    	  "tenantId" : "51fee64b46d1c929412e778f",
	    	  "name" : "Asset Pool for Wisconsin",
	    	  "assets" : [ {
		    	    "name" : null,
		    	    "type" : null,
		    	    "property" : "/assetPool/assetFile/520e50967b02f5c3eb7d048c/keanu-reeves-cheer-up.png",
		    	    "assetFileGridId" : "520e50967b02f5c3eb7d048c",
		    	    "assetFileName" : "keanu-reeves-cheer-up.png",
		    	    "fileContentType" : "image/jpeg",
		    	    "basePath" : "http://localhost:8089/prog-mgmnt.rest",
		    	    "url" : "http://localhost:8089/prog-mgmnt.rest/assetPool/assetFile/520e50967b02f5c3eb7d048c/keanu-reeves-cheer-up.png"
		    	  }],
	    	  "url" : "/assetPool/520d40607b023b2cc54dd3e9"
	    	}); 
	    
	    assetPoolController = $controller('AssetPoolEditController', {
		      $scope : $scope,
		      loadedData : {data:tenantList, errors:[], AssetPoolService: assetPoolServiceMock, TenantTypeService: tenantTypeServiceMock}
	    });
	    
	    $scope.tenant = tenant;
  }));
  
  it('reload tenant pool', function(){
	  //spyOn(assetPoolServiceMock, "loadAssetPool");
	  $scope.reloadTenantPool();
	  
	  //expect(assetPoolServiceMock.loadAssetPool).toHaveBeenCalled();
	  //expect(assetPoolServiceMock.loadAssetPool).toHaveBeenCalledWith(tenant.id);
	  expect($scope.assetPool[0].id).toBe(tenant.id);
	  expect($scope.assetPool[1].id).toBe(mnTenant.id);
  });
  
  it('change tenant', function(){
	  httpMock.expectGET(/assetPool\/tenant\/7898ts67d67h67sdh67sdg67h67/).respond(mnTenant);
	  spyOn($scope, "reloadTenantPool");
	  
	  expect($scope.tenant).toBe(tenant);
	  $scope.changeTenant(mnTenant);
	  
	  expect($scope.tenant).toBe(mnTenant);
	  expect($scope.reloadTenantPool).toHaveBeenCalled();
  });
  
  it('load all tenant types', function(){
	  httpMock.expectGET(/tenantTypes/).respond({});
	  spyOn(tenantTypeServiceMock, "loadAllTenantTypes");
	  
	  tenantTypeServiceMock.loadAllTenantTypes();
	  
//	  expect($scope.tenantTypes).toBeDefined();
	  expect(tenantTypeServiceMock.loadAllTenantTypes).toHaveBeenCalled();
  });
  
  it('delete item from pool', function(){
	  $scope.assetPool = assetPool;
	  httpMock.expectDELETE(/assetPool\/7df8s7s67zsdgh67sdxdf67hhx\/assetFile\/7df8s7s67zsdgh67sdxdf67hhx/).respond({});
	  spyOn($scope, "reloadTenantPool");
//	  spyOn(assetPoolService, "deleteAssetFromPool");
	  $scope.deleteItemFromPool(assetPool.id);
	  
//	  expect($scope.reloadTenantPool).toHaveBeenCalled();
//	  expect($scope.deleteAssetFromPool).toHaveBeenCalled();
  });
  
  it('set active pool', function(){
//	  var data = { "result": assetPool };
	  
	  $scope.setActivePool(assetPool);
//	  expect($scope.options.handleResponse("test", data)).toBe(1);
	  
	  expect($scope.assetPool).toBe(assetPool);
	  expect($scope.assets).toBe(assetPool.assets);
  });
  
});
