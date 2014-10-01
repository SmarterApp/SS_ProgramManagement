
describe('Asset Editor', function() {
  var $scope, $compile, element, template;
  var assetEditorScope, assets;
  
  // temporary fix for external template issue
  template = '<asset-value-editor><div class="tableWrapper">' + 
'<table  class="propertyValueTable assetGroupEditor" data-ng-class="{assetPoolExpanded : assetPoolVisible == true}">' + 
       '<colgroup>' + 
           '<col>' + 
           '<col>' + 
           '<col>' + 
           '<col class="thumbnailColumn">' + 
           '<col class="actionColumn">' + 
           '<col class="actionColumn">' + 
       '</colgroup>' + 
       '<tr>' + 
           '<th>Asset Name</th>' + 
           '<th>Asset Type</th>' + 
           '<th>Value</th>' + 
           '<th>Preview</th>' + 
           '<th></th>' + 
           '<th>' + 
               '<div class="tableButtonGroup">' + 
                    '<button data-ng-click="addItem()" class="boxBtn" ><span class="btnIcon icon_sprite icon_saveAdd2"></span></button>' + 
               '</div>' + 
           '</th>' + 
       '</tr>' + 
       '<tr data-ng-class="{highlight: $index == highlighted}" data-ng-repeat="asset in assets">' + 
           '<td class="normalSpace">' + 
                '<input type="text" data-ng-model="asset.name"/>' + 
           '</td>' + 
           '<td class="normalSpace">' + 
                '<select data-ng-model="asset.type">' + 
                    '<option value="PROPERTY">Property</option>' + 
                    '<option value="IMAGE">Image</option>' + 
                '</select>' + 
           '</td>' + 
           '<td class="normalSpace">' + 
                '<input type="text" data-ng-model="asset.property"/>' + 
           '</td>' + 
           '<td class="normalSpace thumbnailColumn" data-ng-switch="asset.type">' + 
                '<div data-ng-switch-when="IMAGE">' + 
                    '<img class="thumbnail" data-ng-src="{{baseUrl}}{{asset.property}}" alt=""/>' + 
                '</div>' + 
                '<div data-ng-switch-default></div>' + 
           '</td>' + 
           '<td class="normalSpace">' + 
                '<button  data-ng-show="asset.type == \'FILE\' || asset.type == \'IMAGE\'"  data-ng-click="searchFromPool($index)" class="boxBtn" ><span class="btnIcon icon_sprite icon_view2"></span></button>' + 
           '</td>' + 
           '<td class="normalSpace">' + 
                '<button data-ng-click="removeAssetValue($index)" class="boxBtn" ><span class="btnIcon icon_sprite icon_delete2"></span></button>' + 
           '</td>' + 
       '</tr>' + 
'</table>' +  
'<div data-ng-show="assetPoolVisible" class="assetPoolSelector highlight">' + 
    '<div class="fieldGroup">' + 
        '<h5>Asset Pool</h5>' + 
        '<p class="informational">Select an item from your reusable pool of assets. </p>' + 
        '<ul>' + 
            '<li>' + 
                '<span>' +  
                    '<label for="assetPoolItem">Asset:</label>' +  
                    '<select data-ng-model="selectedPoolAsset" data-ng-options="assetPoolFile as assetPoolFile.assetFileName for assetPoolFile in assetsFromPool"></select>' + 
                '</span>' + 
            '</li>' + 
        '</ul>' +             
      '<button data-ng-click="useMe()" class="boxBtn" ><span class="btnIcon icon_sprite icon_save2"></span> <span class="btnText">Use</span></button>' + 
      '<button data-ng-click="cancel()" class="boxBtn" ><span class="btnIcon icon_sprite icon_cancel2"></span> <span class="btnText">Cancel</span></button>' + 
    '</div>' + 
'</div>' + 
'</div></asset-value-editor>';
  
  
  function compile(data) {
      var el = $compile(data)($scope);
      $scope.$apply();
      return el;
  }

  //you need to indicate your module in a test
  beforeEach(module('progman'));
  
  //beforeEach(module('main/webapp/resources/progman/partials/asset-editor.html'));
 
  beforeEach(inject(function(_$rootScope_, _$compile_, $injector, $templateCache) {
	  
	  assets = [ {
		    "name" : "Test Asset",
		    "type" : "POST",
		    "property" : "/assetPool/assetFile/520e50967b02f5c3eb7d048c/keanu-reeves-cheer-up.png",
		    "assetFileGridId" : "520e50967b02f5c3eb7d048c",
		    "assetFileName" : "keanu-reeves-cheer-up.png",
		    "fileContentType" : "image/jpeg",
		    "basePath" : "http://localhost:8080/prog-mgmnt.rest",
		    "url" : "http://localhost:8080/prog-mgmnt.rest/assetPool/assetFile/520e50967b02f5c3eb7d048c/keanu-reeves-cheer-up.png"
	  }, {
		    "name" : "Another Asset",
		    "type" : "POST",
		    "property" : "/assetPool/assetFile/rwers67gz67d67dh67xgxddj/sad-favre.png",
		    "assetFileGridId" : "rwers67gz67d67dh67xgxddj",
		    "assetFileName" : "sad-favre.png",
		    "fileContentType" : "image/jpeg",
		    "basePath" : "http://localhost:8080/prog-mgmnt.rest",
		    "url" : "http://localhost:8080/prog-mgmnt.rest/assetPool/assetFile/rwers67gz67d67dh67xgxddj/sad-favre.png"
	  }];
	  
	  $scope = _$rootScope_;
	  $compile = _$compile_;
	  //template = $templateCache.get('main/webapp/resources/progman/partials/asset-editor.html');
	  $templateCache.put('resources/progman/partials/asset-editor.html', template);
	  element = compile('<div assetvalueeditor></div>');
	  assetEditorScope = element.isolateScope();
  }));
  
  afterEach(function () {
      element.remove();
  });

  it('should remove asset value', function() {
//	  var button = compile('<button data-ng-click="removeAssetValue(0)" class="boxBtn" ><span class="btnIcon icon_sprite icon_delete2"></span></button>', $scope);
	  var buttons = element.find("button");
	  assetEditorScope.assets = assets;
//	  assetEditorScope.assetsFromPool = assets;
	  assetEditorScope.formName = "formName";
//	  assetEditorScope.baseUrl = "localhost:8080";
	  
	  expect(assetEditorScope.assets.length).toBe(2);
//	  expect(template.find("button").length).toBe(1);
//	  expect(template).toBe(1);
//	  buttons[0].click();
//	  scope.addItem();
	  assetEditorScope.removeAssetValue(0);
	  expect(assetEditorScope.assets.length).toBe(1);
  });
  
  it('should search from pool', function() {
	  expect(assetEditorScope.highlighted).toBe(-1);
	  expect(assetEditorScope.assetPoolVisible).toBeFalsy();
	  
	  assetEditorScope.searchFromPool(3);
	  expect(assetEditorScope.highlighted).toBe(3);
	  expect(assetEditorScope.assetPoolVisible).toBeTruthy();
  });
  
  it('should use me', function() {
	  assetEditorScope.assets = assets;
	  assetEditorScope.assetPoolVisible = true;
	  assetEditorScope.highlighted = 1;
	  assetEditorScope.selectedPoolAsset = assets[1];
	  
	  assetEditorScope.useMe();
	  expect(assetEditorScope.selectedPoolAsset).toBeDefined();
	  expect(assetEditorScope.assets[1].property).toBe(assets[1].property);
	  expect(assetEditorScope.assets[1].assetFileGridId).toBe(assets[1].assetFileGridId);
	  expect(assetEditorScope.assets[1].assetFileName).toBe(assets[1].assetFileName);
  });
  
  it('should cancel', function() {
	  assetEditorScope.assetPoolVisible = true;
	  assetEditorScope.highlighted = 1;
	  assetEditorScope.selectedPoolAsset = assets[0];
	  
	  assetEditorScope.cancel();
	  expect(assetEditorScope.assetPoolVisible).toBeFalsy();
	  expect(assetEditorScope.highlighted).toBe(-1);
	  expect(assetEditorScope.selectedPoolAsset).toBeNull();
  });
  
  it('should add item', function() {
	  assetEditorScope.assets = assets;
	  assetEditorScope.formName = "formName";
	  expect(assetEditorScope.assets.length).toBe(2);
	  
	  assetEditorScope.addItem();
	  expect(assetEditorScope.assets.length).toBe(3);
  });
  
});

