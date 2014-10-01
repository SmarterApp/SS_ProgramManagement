describe('Asset Pool Service', function($injector_) {
  var baseUrl;
  var httpMock;
  var $injector;
  
  var tenant = {
    	  "id" : "51fee64b46d1c929412e778f",
    	  "name" : "Wisconsin",
    	  "type" : "STATE",
    	  "url" : "/tenant/51fee64b46d1c929412e778f"
  };
  
  var assetPool = {
    	  "id" : "ser7s7r6t89seh89eherhsrh",
    	  "tenantId" : "51fee64b46d1c929412e778f",
    	  "name" : "Asset Pool for Wisconsin",
    	  "assets" : [ {
	    	    "name" : "TestAsset",
	    	    "type" : "POST",
	    	    "property" : "/assetPool/assetFile/520e50967b02f5c3eb7d048c/keanu-reeves-cheer-up.png",
	    	    "assetFileGridId" : "520e50967b02f5c3eb7d048c",
	    	    "assetFileName" : "keanu-reeves-cheer-up.png",
	    	    "fileContentType" : "image/jpeg",
	    	    "basePath" : "http://localhost:8089/prog-mgmnt.rest",
	    	    "url" : "http://localhost:8080/prog-mgmnt.rest/assetPool/assetFile/520e50967b02f5c3eb7d048c/keanu-reeves-cheer-up.png"
	    	  }],
    	  "url" : "/assetPool/ser7s7r6t89seh89eherhsrh"
  };
  
  var mockedLoadData = { method: "GET", data: assetPool, url: "/assetPool/" + assetPool.id };
  var mockedSaveData = { method: "POST", data: assetPool, url: "/assetPool/" + assetPool.id };
  var mockedDeleteData = { method: "DELETE", url: "/assetPool/remove/" + assetPool.id + "/assetFile/geaw9awe7798rhwa789" };
  var mockedUploadFileData = { method: "POST", data: assetPool, url: "/assetPool/" + assetPool.id + "/assetName/" + assetPool.assets[0].name + "/assetFile" };
  
  //you need to indicate your module in a test
  beforeEach(module('progman'));
  
  // Setup the mock service in an anonymous module.
  beforeEach(module(function ($provide) {
	  $provide.value('AssetPoolService', {
		loadAssetPool: function () {
			return {
				then: function (callback) {
					callback(mockedLoadData);
				}
			};
		},
		saveAssetPool: function () {
			return {
				then: function (callback) {
					callback(mockedSaveData);
				}
			};
		},
		deleteAssetFromPool: function () {
			return {
				then: function (callback) {
					callback(mockedDeleteData);
				}
			};
		},
		uploadFile: function () {
			return {
				then: function (callback) {
					callback(mockedUploadFileData);
				}
			};
		}
	  });
  }));
  
  beforeEach(inject(function(_$injector_) {
	  baseUrl = "http://localhost:8080/prog-mgmnt.rest/";
	  $injector = _$injector_;
	  httpMock = $injector.get('$httpBackend');
  }));
  
  it('load asset pool', inject(function(AssetPoolService) {
	  httpMock.expectGET(/assetPool\/tenant\/ser7s7r6t89seh89eherhsrh/).respond(assetPool);
	  
	  AssetPoolService.loadAssetPool(assetPool).then(function(response) {
		  expect(response.method).toEqual("GET");
		  expect(response.data).toEqual(assetPool);
		  expect(response.url).toEqual(assetPool.url);
	  });
  }));
  
  it('save asset pool', inject(function(AssetPoolService) {
	  httpMock.expectPUT(/assetPool\/ser7s7r6t89seh89eherhsrh/).respond(assetPool);
	  
	  AssetPoolService.saveAssetPool(assetPool).then(function(response) {
		  expect(response.method).toEqual("POST");
		  expect(response.data).toEqual(assetPool);
		  expect(response.url).toEqual(assetPool.url);
	  });
  }));
  
  it('delete asset from pool', inject(function(AssetPoolService) {
	  httpMock.expectDELETE(/assetPool\/remove\/ser7s7r6t89seh89eherhsrh/).respond(assetPool);
	  
	  AssetPoolService.deleteAssetFromPool(assetPool).then(function(response) {
		  expect(response.method).toEqual("DELETE");
		  expect(response.url).toEqual("/assetPool/remove/" + assetPool.id + "/assetFile/geaw9awe7798rhwa789");
	  });
  }));
  
  it('upload file for asset pool', inject(function(AssetPoolService) {
	  AssetPoolService.uploadFile(assetPool.id, assetPool.assets[0].name, "keanu-reeves-cheer-up.png").then(function(response) {
		  expect(response.method).toEqual("POST");
		  expect(response.data).toEqual(assetPool);
		  expect(response.url).toEqual(assetPool.url + "/assetName/" + assetPool.assets[0].name + "/assetFile");
	  });
  }));
  
});

