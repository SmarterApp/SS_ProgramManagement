
describe('Tenant Subscription', function() {
  var $scope, $compile, element, template, httpMock;
  var subscriptionScope, components, subscriptions, tenant, newSubscription, unsubscribed;
  
  // temporary fix for external template issue
  template = '<div class="tableWrapper">' + 
		'<label class="control-label">Component Subscription</label>' + 
		'<table class="dataTable">' + 
		    '<colgroup>' + 
		        '<col class="actionColumn">' + 
		        '<col>' + 
		        '<col>' + 
		    '</colgroup>' + 
		    '<tr>' + 
		        '<th></th>' + 
		        '<th>Component Name</th>' + 
		        '<th>Good Standing</th>' + 
		    '</tr>' + 
		    '<tr data-ng-repeat="tobeSubscribed in unsubscribed">' + 
		        '<td class="normalSpace">' + 
		            '<div class="tableButtonGroup">' + 
		                '<input type="checkbox" data-ng-model="tobeSubscribed.subscribe"  data-ng-click="addRemoveSubscription(tobeSubscribed.subscribe, tobeSubscribed.component, $index)"/>' + 
		            '</div>' + 
		        '</td>' + 
		        '<td>{{tobeSubscribed.component.name}}</td>' + 
		        '<td><input type="checkbox" name="inGoodStanding"  data-ng-disabled="!tobeSubscribed.subscribe" data-ng-model="tobeSubscribed.inGoodStanding" data-ng-click="toggleGoodStanding(tobeSubscribed.inGoodStanding, tobeSubscribed.component.id, $index)"/></td>' + 
		    '</tr>' + 
		'</table>' +  
	'</div>';
  
  
  function compile(data) {
      var el = $compile(data)($scope);
      $scope.$apply();
      return el;
  }

  //you need to indicate your module in a test
  beforeEach(module('progman'));
  
  //beforeEach(module('main/webapp/resources/progman/partials/tenantSubscription-editor.html'));
 
  beforeEach(inject(function(_$rootScope_, _$compile_, $injector, $templateCache) {
	  
	  components = [{
	    	  "id" : "987hre789hrarh0rawh890",
	    	  "name" : "tib",
	    	  "url" : "/component/987hre789hrarh0rawh890"
	  }, {
    	  "id" : "g68rshresje8s6ese7seherjrhes",
    	  "name" : "mna",
    	  "url" : "/component/g68rshresje8s6ese7seherjrhes"
	  }, {
    	  "id" : "fds67g6s6d67hsf67jdsdjdshf67",
    	  "name" : "tsb",
    	  "url" : "/component/fds67g6s6d67hsf67jdsdjdshf67"
	  }];
	  
	  unsubscribed = [{
    	  "inGoodStanding.disabled" : "enabled",
    	  "inGoodStanding" : true
	  }, {
    	  "inGoodStanding.disabled" : "enabled",
    	  "inGoodStanding" : true
	  }];
	  
	  subscriptions = [{
    	  "component" : components[0],
    	  "inGoodStanding" : true
	  }, {
    	  "component" : components[1],
    	  "inGoodStanding" : false
	  }];
	  
	  newSubscription = {
    	  "component" : components[2],
    	  "inGoodStanding" : true
	  };
	  
	  tenant = {
		  "id" : "51fee64b46d1c929412e778f",
		  "name" : "Wisconsin",
		  "type" : "STATE",
		  "url" : "/tenant/51fee64b46d1c929412e778f",
		  "tenantSubscriptions": subscriptions
	  };
	  
	  httpMock = $injector.get('$httpBackend');
	  httpMock.expectGET(/component/).respond({});
	  $scope = _$rootScope_;
	  $compile = _$compile_;
	  //template = $templateCache.get('main/webapp/resources/progman/partials/tenantSubscription-editor.html');
	  $templateCache.put('resources/progman/partials/tenantSubscription-editor.html', template);
	  element = compile('<div tenantsubscriptioneditor></div>');
	  subscriptionScope = element.scope();
	  subscriptionScope.tenant = tenant;
	  subscriptionScope.components = components;
	  subscriptionScope.unsubscribed = unsubscribed;
  }));
  
  afterEach(function () {
      element.remove();
  });

  xit('should add subscription', function() {
	  expect(subscriptionScope.tenant.tenantSubscriptions.length).toBe(2);
	  
	  subscriptionScope.addRemoveSubscription(true, components[2], 0);
	  expect(subscriptionScope.tenant.tenantSubscriptions.length).toBe(3);
  });
  
  xit('should remove subscription', function() {
	  expect(subscriptionScope.tenant.tenantSubscriptions.length).toBe(2);
	  
	  subscriptionScope.addRemoveSubscription(false, components[0], 0);
	  expect(subscriptionScope.tenant.tenantSubscriptions.length).toBe(1);
  });
  
});

