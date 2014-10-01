describe('AssetGroup Edit Controller ', function() {
  var $scope, editController, assetPoolService, assetGroupService = null;
  
  var unsavedAssetGroup = {
		  "tenant" : { "id": "51fee64b46d1c929412e778f", "name" : "Wisconsin", "type" : "STATE", "url" : "/tenant/51fee64b46d1c929412e778f" },
		  "component" : { "id": "53e89dsgf78dsxd67dghd", "name": "tib", "url" : "/component/53e89dsgf78dsxd67dghd" },
		  "assets" : [],
		};
  
  var savedAssetGroup = {
		  "tenant" : { "id": "78d9fssdfh67s568ss", "name" : "Minnesota", "type" : "STATE", "url" : "/tenant/78d9fssdfh67s568ss" },
		  "component" : { "id": "78g67gawehsehser6jt", "name": "mna", "url" : "/component/78g67gawehsehser6jt" },
		  "assets" : [ {
		    "name" : "backgroundColor",
		    "type" : "PROPERTY",
		    "property" : "red",
		    "assetFileGridId" : null
		  }, {
		    "name" : "title text",
		    "type" : "PROPERTY",
		    "property" : "hello world",
		    "assetFileGridId" : null
		  } ],
		};
  
  var clonedAssetGroup = {
		  "id" : "id_12346",
		  "tenantId" : "51fee64b46d1c929412e778f",
		  "componentName" : "tib2",
		  "assets" : [ {
		    "name" : "backgroundColor",
		    "type" : "PROPERTY",
		    "property" : "red",
		    "assetFileGridId" : null
		  }, {
		    "name" : "title text",
		    "type" : "PROPERTY",
		    "property" : "hello world",
		    "assetFileGridId" : null
		  } ],
		};
  
  var tenantList = [{
	  "id" : "51fee64b46d1c929412e778f",
	  "name" : "Wisconsin",
	  "type" : "STATE",
	  "url" : "/tenant/51fee64b46d1c929412e778f"
	}, {
	  "id" : "78d9fssdfh67s568ss",
	  "name" : "Minnesota",
	  "type" : "STATE",
	  "url" : "/tenant/78d9fssdfh67s568ss"
	}, {
	  "id" : "564jk3k4hgj5jh68fh789l5",
	  "name" : "Central District of WI",
	  "type" : "DISTRICT",
	  "url" : "/tenant/564jk3k4hgj5jh68fh789l5"
	}];
  
  var assets = {
    	  "assets" : [ {
	    	    "name" : null,
	    	    "type" : null,
	    	    "property" : "/assetPool/assetFile/520e50967b02f5c3eb7d048c/keanu-reeves-cheer-up.png",
	    	    "assetFileGridId" : "520e50967b02f5c3eb7d048c",
	    	    "assetFileName" : "keanu-reeves-cheer-up.png",
	    	    "fileContentType" : "image/jpeg",
	    	    "basePath" : "http://localhost:8089/prog-mgmnt.rest",
	    	    "url" : "http://localhost:8080/prog-mgmnt.rest/assetPool/assetFile/520e50967b02f5c3eb7d048c/keanu-reeves-cheer-up.png"
	    	  }]
  };
  
  var assetPoolWI = {
    	  "id" : "520d40607b023b2cc54dd3e9",
    	  "tenantId" : "51fee64b46d1c929412e778f",
    	  "name" : "Asset Pool for Wisconsin",
    	  "assets" : assets,
    	  "url" : "/assetPool/520d40607b023b2cc54dd3e9"
  };
  
  var assetPoolMN = {
    	  "id" : "9hr96767awweg67rheaw9",
    	  "tenantId" : "78d9fssdfh67s568ss",
    	  "name" : "Asset Pool for Minnesota",
    	  "assets" : assets,
    	  "url" : "/assetPool/9hr96767awweg67rheaw9"
  };
  
  var data = {
	  assetGroup: savedAssetGroup,
	  assets: assets
  };

  //you need to indicate your module in a test
  beforeEach(module('progman'));
 
  beforeEach(inject(function($rootScope, $controller, $injector, $state, $http, AssetPoolService, AssetGroupService) {
	    //create a scope object for us to use.
	    $scope = $rootScope.$new();
	    httpMock = $injector.get('$httpBackend');
	    
	    assetPoolService = AssetPoolService;
	    assetGroupService = AssetGroupService;
		
	    //respond nothing for templates....
	    httpMock.whenGET(/\.html/).respond("");
	    httpMock.whenGET(/tenantsBySearchVal/).respond(tenantList);

	    httpMock.expectGET(/component/).respond({});

	    //tenants is called to load selectbox
	    httpMock.whenGET(/^tenant\/51fee64b46d1c929412e778f/).respond({
	    	  "id" : "51fee64b46d1c929412e778f",
	    	  "name" : "Wisconsin",
	    	  "type" : "STATE",
	    	  "url" : "/tenant/51fee64b46d1c929412e778f"
	    	}); 
	    
	    httpMock.whenGET(/^assetPool\/tenant\/51fee64b46d1c929412e778f/).respond(assetPoolWI);
	    httpMock.whenGET(/^assetPool\/tenant\/78d9fssdfh67s568ss/).respond(assetPoolMN);
	    
	    editController = $controller('AssetGroupEditController', {
		      $scope : $scope,
		      loadedData : {data:data, errors:[]},
		      cloneData : {data:clonedAssetGroup, errors:[]}
	    });
	    
	    var mockForm = {};
	    mockForm.$setPristine = function(){};
	    $scope.assetGroupForm = mockForm;
	    
  }));
  
  xit('verify we saved the asset group successfully', function() {
	  httpMock.whenPOST("assetGroup").respond(savedAssetGroup);
	  expect($scope.savingIndicator).toEqual(false);
//	  spyOn(assetGroupService, "saveAssetGroup");
	  
	  $scope.save(unsavedAssetGroup);
	  
//	  spyOn(assetGroupService, "saveAssetGroup");
	  
	  //routes to edit page on successful save
	  httpMock.whenGET(/^assetGroup\/78d9fssdfh67s568ss/).respond(savedAssetGroup);
	  expect($scope.savingIndicator).toEqual(true);
//	  expect(assetGroupService.saveAssetGroup).toHaveBeenCalled();

	  httpMock.flush();
  });
  
  it('change tenant', function(){
	  $scope.tenant = tenantList[0];
	  expect($scope.tenant).toBe(tenantList[0]);
	  
	  $scope.changeTenant(tenantList[1]);
	  expect($scope.assetGroup.tenant).toBe(tenantList[1]);
  });
  
  xit('verify assetPool info loaded', function(){
	  httpMock.flush();
	  assetPoolService.loadAssetPool(tenantList[0].id);
	  
	  expect($scope.assetsFromPool.length).toBe(1);
	  expect($scope.assetsFromPool[0].assetFileName).toBe("keanu-reeves-cheer-up.png");
	  expect($scope.assetsFromPool[0].assetFileGridId).toBe("520e50967b02f5c3eb7d048c");
	  expect($scope.assetsFromPool[0].url).toBe("http://localhost:8089/prog-mgmnt.rest/assetPool/assetFile/520e50967b02f5c3eb7d048c/keanu-reeves-cheer-up.png");
  });
  
  it('verify error handled correctly', function() {
	  var errorMessageResponse = {
			  "messages" : {
				    "tenant" : [ "assetGroup.tenant.required" ],
				    "component" : [ "assetGroup.component.required" ]
				  }
				};
	  httpMock.whenPOST("assetGroup").respond(400, errorMessageResponse);
	
	  $scope.save(savedAssetGroup);
	  httpMock.flush();
	  expect($scope.errors.length).toBe(2);
	  expect($scope.errors[0]).toBe("assetGroup.tenant.required");
	  expect($scope.errors[1]).toBe("assetGroup.component.required");
  });

  it('saving indicator toggles correctly', function() {
	  expect($scope.savingIndicator).toEqual(false);
	  httpMock.whenGET(/^assetGroup\/78d9fssdfh67s568ss/).respond(savedAssetGroup);
	  httpMock.whenPOST("assetGroup").respond(savedAssetGroup); 
	  $scope.save(unsavedAssetGroup);
	  expect($scope.savingIndicator).toEqual(true);
	  httpMock.flush();
	  expect($scope.savingIndicator).toEqual(false);
  });
 
});

