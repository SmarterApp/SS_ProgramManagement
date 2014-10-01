
describe('Property Config Editor', function() {
  var $scope, $compile, element, template;
  var propertyConfigScope, properties;
  
  // temporary fix for external template issue
  template = '<div class="tableWrapper">' + 
	'<div>' + 
	   'Property Editor: <input type="radio" data-ng-model="editor" value="form"> Form Entry <input type="radio" value="propertyFile" data-ng-model="editor"> Property File Entry' +  
	'</div>' + 
	'<table data-ng-show="editor == \'form\'" class="propertyValueTable">' + 
	       '<colgroup>' + 
	           '<col>' + 
	           '<col>' + 
	           '<col>' + 
            '<col class="actionColumn">' + 
	       '</colgroup>' + 
	       '<tr>' + 
	           '<th>Encrypt</th>' + 
            '<th>Key</th>' + 
	           '<th>Value</th>' + 
	           '<th>' + 
	               '<div class="tableButtonGroup">' + 
                     '<button data-ng-click="addItem()" class="boxBtn" ><span class="btnIcon icon_sprite icon_saveAdd2"></span></button>' + 
                '</div>' + 
            '</th>' + 
	       '</tr>' + 
	       
	       '<tr data-ng-repeat="propertyEntry in properties">' + 
	           '<td><input type="checkbox" data-ng-model="propertyEntry.encrypt" /> </td>' + 
            '<td><input type="text" data-ng-model="propertyEntry.propertyKey"/> </td>' + 
	           '<td><input type="text" data-ng-model="propertyEntry.propertyValue" data-ng-hide="propertyEntry.encrypt" data-ng-show="!propertyEntry.encrypt"/><input type="password" data-ng-model="propertyEntry.propertyValue" data-ng-hide="!propertyEntry.encrypt" data-ng-show="propertyEntry.encrypt"/></td>' + 
	           '<td class="normalSpace">' + 
                '<div class="tableButtonGroup">' + 
                     '<button data-ng-click="removeMapValue($index)" class="boxBtn" ><span class="btnIcon icon_sprite icon_delete2"></span></button>' + 
                '</div>' + 
            '</td>' + 
	       '</tr>' + 
	'</table>' + 
	'<textarea data-ng-show="editor == \'propertyFile\'" class="large" data-ng-model="textProperties"> </textarea>' + 
'</div>';

  function compile(data) {
      var el = $compile(data)($scope);
      $scope.$apply();
      return el;
  }

  //you need to indicate your module in a test
  beforeEach(module('progman'));
  
  //beforeEach(module('main/webapp/resources/progman/partials/map-editor.html'));
 
  beforeEach(inject(function(_$rootScope_, _$compile_, $injector, $templateCache) {
	  
	  properties = [{
		  "id" : "rs89ser7erh789sesetetjs",
    	  "encrypt" : "encryption",
    	  "propertyKey" : "propKey",
    	  "propertyValue": "propVal"
	  }, {
		  "id" : "78s6srdgsrdthfhdd",
    	  "encrypt" : "encryption2",
    	  "propertyKey" : "propKey2",
    	  "propertyValue": "propVal2"
	  }];
	  
	  $scope = _$rootScope_;
	  $compile = _$compile_;
	  //template = $templateCache.get('main/webapp/resources/progman/partials/map-editor.html');
	  $templateCache.put('resources/progman/partials/map-editor.html', template);
	  element = compile('<div mapvalueeditor data-selected-cell-id="encrypt0"></div>');
	  propertyConfigScope = element.isolateScope();
  }));
  
  afterEach(function () {
      element.remove();
  });

  xit('should toggle me', function() {
	  expect(propertyConfigScope.textProperties).toBeUndefined();
	  propertyConfigScope.formName = "formName";
	  //propertyConfigScope.properties = properties;
	  propertyConfigScope.editor = "propertyFile";
	  propertyConfigScope.$digest();
	  expect(propertyConfigScope.textProperties).toBe(properties[0].encrypt + ":" + properties[0].propertyKey + "=" + properties[0].propertyValue + "\n" + properties[1].encrypt + ":" + properties[1].propertyKey + "=" + properties[1].propertyValue + "\n");
  });
  
  xit('should parse properties from text', function() {
	  //propertyConfigScope.properties = properties;
	  expect(propertyConfigScope.properties).toBeUndefined();

	  propertyConfigScope.textProperties = properties[0].encrypt + ":" + properties[0].propertyKey + "=" + properties[0].propertyValue + "\n" + properties[1].encrypt + ":" + properties[1].propertyKey + "=" + properties[1].propertyValue + "\n";
	  //expect(propertyConfigScope.textProperties).toBe(properties[0].encrypt + ":" + properties[0].propertyKey + "=" + properties[0].propertyValue + "\n" + properties[1].encrypt + ":" + properties[1].propertyKey + "=" + properties[1].propertyValue + "\n");
	  expect(propertyConfigScope.properties).toBe(1);
  });
  
  it('should remove map value', function() {
	  propertyConfigScope.formName = "formName";
	  propertyConfigScope.properties = properties;
	  expect(propertyConfigScope.properties.length).toBe(2);

	  propertyConfigScope.removeMapValue(0);
	  expect(propertyConfigScope.properties.length).toBe(1);
  });
  
  it('should add item', function() {
	  propertyConfigScope.formName = "formName";
	  propertyConfigScope.properties = properties;
	  expect(propertyConfigScope.properties.length).toBe(2);

	  propertyConfigScope.addItem();
	  expect(propertyConfigScope.properties.length).toBe(3);
  });
  
});

