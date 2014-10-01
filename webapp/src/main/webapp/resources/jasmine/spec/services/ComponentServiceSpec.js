describe('Component Service', function($injector_) {
  var baseUrl;
  var httpMock;
  var $injector;
  
  var component = {
    	  "id" : "987hre789hrarh0rawh890",
    	  "name" : "tib",
    	  "url" : "/component/987hre789hrarh0rawh890"
  };
  
  var mockedSaveData = { method: "POST", data: component, url: "/component/" + component.id };
  var mockedLoadData = { method: "GET", data: component, url: "/component/" + component.id };
  var mockedLoadAllData = { method: "GET", data: component, url: "/component/" };
  
  //you need to indicate your module in a test
  beforeEach(module('progman'));
  
  // Setup the mock service in an anonymous module.
  beforeEach(module(function ($provide) {
	  $provide.value('ComponentService', {
			saveComponent: function () {
				return {
					then: function (callback) {
						callback(mockedSaveData);
					}
				};
			},
		loadComponent: function () {
			return {
				then: function (callback) {
					callback(mockedLoadData);
				}
			};
		},
		loadAllComponents: function () {
			return {
				then: function (callback) {
					callback(mockedLoadAllData);
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
  
  it('save component', inject(function(ComponentService) {
	  httpMock.expectPUT(/component\/987hre789hrarh0rawh890/).respond(component);
	  
	  ComponentService.saveComponent(component).then(function(response) {
		  expect(response.method).toEqual("POST");
		  expect(response.data).toEqual(component);
		  expect(response.url).toEqual(component.url);
	  });
  }));
  
  it('load component', inject(function(ComponentService) {
	  httpMock.expectGET(/component\/987hre789hrarh0rawh890/).respond(component);
	  
	  ComponentService.loadComponent(component).then(function(response) {
		  expect(response.method).toEqual("GET");
		  expect(response.data).toEqual(component);
		  expect(response.url).toEqual(component.url);
	  });
  }));
  
  it('load all components', inject(function(ComponentService) {
	  httpMock.expectGET(/component\/1/).respond(component);
	  
	  ComponentService.loadAllComponents(component).then(function(response) {
		  expect(response.method).toEqual("GET");
		  expect(response.data).toEqual(component);
		  expect(response.url).toEqual("/component/");
	  });
  }));
  
});

