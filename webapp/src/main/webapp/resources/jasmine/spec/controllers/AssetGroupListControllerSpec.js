describe('AssetGroup List Controller ', function() {
  var $scope, listController, assetGroupService, stateProv, resolveCallback = null;
  
  var assetGroupServiceMock;
  
  var unsavedAssetGroup = {
		  "tenantId" : "51fee64b46d1c929412e778f",
		  "componentName" : "tib",
		  "assets" : [],
		};
  
  var savedAssetGroup = {
		  "id" : "id_12345",
		  "tenantId" : "51fee64b46d1c929412e778f",
		  "componentName" : "tib",
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
	  "id" : "id_12345",
	  "name" : "Wisconsin",
	  "type" : "STATE",
	  "url" : "/tenant/id_12345"
	}, {
	  "id" : "856ee64b46gfs29412e532d",
	  "name" : "Minnesota",
	  "type" : "STATE",
	  "url" : "/tenant/856ee64b46gfs29412e532d"
	}, {
	  "id" : "564jk3k4hgj5jh68fh789l5",
	  "name" : "Central District of WI",
	  "type" : "DISTRICT",
	  "url" : "/tenant/564jk3k4hgj5jh68fh789l5"
	}];
  
  
  //you need to indicate your module in a test
  beforeEach(module('progman'));
 
  beforeEach(inject(function($rootScope, $controller, $injector, $state, $http, AssetGroupService) {
	  
	  assetGroupServiceMock = {
			  groupDeleted: false,
			  
			  deleteAssetGroup: function() {
				  assetGroupServiceMock.groupDeleted = true;
				  
				  return {
					  then: resolveCallback
				  };
	          }
	     };
	  
	    //create a scope object for us to use.
	    $scope = $rootScope.$new();
	    httpMock = $injector.get('$httpBackend');
	    stateProv = $state;
	    //respond nothing for templates....
	    httpMock.whenGET(/\.html/).respond("");
	    
	    assetGroupService = AssetGroupService;
	    
	    httpMock.expectGET(/component/).respond({});

	    //tenants is called to load selectbox
	    httpMock.whenGET("tenants").respond(tenantList); 
	    
	    listController = $controller('AssetGroupListController', {
		      $scope : $scope,
		      AssetGroupService: assetGroupServiceMock
	    });

	    var mockForm = {};
	    mockForm.$setPristine = function(){};
	    $scope.assetGroupForm = mockForm;
	    
  }));

  
  it('delete asset group', function() {
	  httpMock.whenPOST("assetGroup").respond(savedAssetGroup);
	  $scope.createNewItem(unsavedAssetGroup);
	  //routes to edit page on successful create call
	  httpMock.whenGET(/^assetGroup\/id_12345/).respond(savedAssetGroup);
	  httpMock.whenDELETE(/^assetGroup\/remove\/id_12345/).respond(savedAssetGroup);
	  
//	  spyOn(assetGroupService, "deleteAssetGroup").andReturn(assetGroupServiceMock);
//	  assetGroupServiceMock.deleteAssetGroup = jasmine.createSpy("deleteAssetGroup");
	  spyOn(assetGroupServiceMock, "deleteAssetGroup");//.andCallThrough();
	  $scope.remove(savedAssetGroup);
//	  expect(ParseServiceMock.deleteAssetGroup).toHaveBeenCalled();
	  
  });
  
  it('change search tenant', function(){
	  var searchParams = { "tenantId": "id_12345" };
	  $scope.searchParams = searchParams;
	  expect($scope.searchParams.tenantId).toBe(tenantList[0].id);
	  
	  $scope.changeSearchTenant(tenantList[1]);
	  expect($scope.searchParams.tenantId).toBe(tenantList[1].id);
  });
  
  it('format search fields', function(){
	  var searchParams = { "tenantId": "id_12345" };
	  $scope.searchParams = searchParams;
	  expect($scope.searchParams.tenantId).toBe(tenantList[0].id);
	  
	  $scope.formatSearchFields();
	  expect($scope.searchParams.tenantId).toBeNull();
  });
  
});

