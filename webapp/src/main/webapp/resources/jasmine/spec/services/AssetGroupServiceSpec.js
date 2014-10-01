describe('Asset Group Service', function($compile_, $injector_) {
  var service;
  var httpMock;
  var $injector;
  
  var tenant = {
    	  "id" : "51fee64b46d1c929412e778f",
    	  "name" : "Wisconsin",
    	  "type" : "STATE",
    	  "url" : "/tenant/51fee64b46d1c929412e778f"
  };
  
  var component = {
    	  "id" : "ser67hsesestje7897895684rd",
    	  "name" : "tib",
    	  "url" : "/component/ser67hsesestje7897895684rd"
  };
  
  var assetGroup = {
    	  "id" : "789grset7essrsrtj6edth",
    	  "tenant" : tenant,
    	  "component" : component,
    	  "assets" : [ {
	    	    "name" : "testAsset",
	    	    "type" : "POST",
	    	    "property" : "/assetPool/assetFile/520e50967b02f5c3eb7d048c/keanu-reeves-cheer-up.png",
	    	    "assetFileGridId" : "520e50967b02f5c3eb7d048c",
	    	    "assetFileName" : "keanu-reeves-cheer-up.png",
	    	    "fileContentType" : "image/jpeg",
	    	    "basePath" : "http://localhost:8089/prog-mgmnt.rest",
	    	    "url" : "http://localhost:8080/prog-mgmnt.rest/assetPool/assetFile/520e50967b02f5c3eb7d048c/keanu-reeves-cheer-up.png"
	    	  }],
    	  "url" : "/assetGroup/789grset7essrsrtj6edth"
  };
  
  var mockedLoadData = { method: "GET", data: assetGroup, url: "/assetGroup/" + assetGroup.id };
  var mockedSaveData = { method: "POST", data: assetGroup, url: "/assetGroup/" + assetGroup.id };
  var mockedCopyData = { method: "POST", data: assetGroup, url: "/assetGroup/copy/" + assetGroup.id };
  var mockedDeleteData = { method: "DELETE", data: assetGroup, url: "/assetGroup/remove/" + assetGroup.id };
  var mockedUploadFileData = { method: "POST", data: assetGroup, url: "/assetGroup/" + assetGroup.id + "/assetName/" + assetGroup.assets[0].name + "/assetFile" };
  var mockedSkinnableAssetData = { data: assetGroup, url: "/skinnableAssets/" + assetGroup.component.name };
  
  //you need to indicate your module in a test
  beforeEach(module('progman'));
  
  // Setup the mock service in an anonymous module.
  beforeEach(module(function ($provide) {
	  $provide.value('AssetGroupService', {
		loadAssetGroup: function () {
			return {
				then: function (callback) {
					callback(mockedLoadData);
				}
			};
		},
		saveAssetGroup: function () {
			return {
				then: function (callback) {
					callback(mockedSaveData);
				}
			};
		},
		copyAssetGroup: function () {
			return {
				then: function (callback) {
					callback(mockedCopyData);
				}
			};
		},
		deleteAssetGroup: function () {
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
		},
		loadAssetForSkinning: function () {
			return {
				then: function (callback) {
					callback(mockedSkinnableAssetData);
				}
			};
		}
	  });
  }));
 
  beforeEach(inject(function(_$injector_) {
	  $injector = _$injector_;
	  httpMock = $injector.get('$httpBackend');
  }));
  
  it('load asset group', inject(function(AssetGroupService) {
	  httpMock.expectGET(/assetGroup\/789grset7essrsrtj6edth/).respond(assetGroup);
	  
	  AssetGroupService.loadAssetGroup(assetGroup).then(function(response) {
		  expect(response.method).toEqual("GET");
		  expect(response.data).toEqual(assetGroup);
		  expect(response.url).toEqual(assetGroup.url);
	  });
  }));
  
  it('save asset group', inject(function(AssetGroupService) {
	  httpMock.expectPUT(/assetGroup\/789grset7essrsrtj6edth/).respond(assetGroup);
	  
	  AssetGroupService.saveAssetGroup(assetGroup).then(function(response) {
		  expect(response.method).toEqual("POST");
		  expect(response.data).toEqual(assetGroup);
		  expect(response.url).toEqual(assetGroup.url);
	  });
  }));
  
  it('copy asset group', inject(function(AssetGroupService) {
	  httpMock.expectPUT(/assetGroup\/copy\/789grset7essrsrtj6edth/).respond(assetGroup);
	  
	  AssetGroupService.copyAssetGroup(assetGroup).then(function(response) {
		  expect(response.method).toEqual("POST");
		  expect(response.data).toEqual(assetGroup);
		  expect(response.url).toEqual("/assetGroup/copy/" + assetGroup.id);
		  
	  });
  }));
  
  it('delete asset group', inject(function(AssetGroupService) {
	  httpMock.expectDELETE(/assetGroup\/remove\/789grset7essrsrtj6edth/).respond(assetGroup);
	  
	  AssetGroupService.deleteAssetGroup(assetGroup).then(function(response) {
		  expect(response.method).toEqual("DELETE");
		  expect(response.data).toEqual(assetGroup);
		  expect(response.url).toEqual("/assetGroup/remove/" + assetGroup.id);
	  });
  }));
  
  it('upload file for asset group', inject(function(AssetGroupService) {
	  AssetGroupService.uploadFile(assetGroup.id, assetGroup.assets[0].name, "keanu-reeves-cheer-up.png").then(function(response) {
		  expect(response.method).toEqual("POST");
		  expect(response.data).toEqual(assetGroup);
		  expect(response.url).toEqual("/assetGroup/" + assetGroup.id + "/assetName/" + assetGroup.assets[0].name + "/assetFile");
	  });
  }));
  
  it('load asset for skinning', inject(function(AssetGroupService) {
	  AssetGroupService.loadAssetForSkinning("tib", {}).then(function(response) {
		  expect(response.data).toEqual(assetGroup);
		  expect(response.url).toEqual("/skinnableAssets/tib");
	  });
  }));
  
});

