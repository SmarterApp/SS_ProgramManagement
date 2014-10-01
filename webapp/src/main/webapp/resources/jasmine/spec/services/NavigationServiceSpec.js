describe('Navigation Service', function($injector_) {
  var baseUrl;
  var httpMock;
  var $injector;
  
  var navigationLinks = [{
	  "title": "Title 1",
	  "stateName": "Name 1",
	  "stateParams": "Params 1"
  }, {
	  "title": "Title 2",
	  "stateName": "Name 2",
	  "stateParams": "Params 2"
  }];
  
  var newNavigationLink = [{
	  "title": "New Title",
	  "stateName": "New Name",
	  "stateParams": "New Params"
  }];
  
  //you need to indicate your module in a test
  beforeEach(module('progman'));
  
  beforeEach(inject(function(_$injector_) {
	  baseUrl = "http://localhost:8080/prog-mgmnt.rest/";
	  $injector = _$injector_;
	  httpMock = $injector.get('$httpBackend');
  }));
  
  it('clear me', inject(function(NavigationService) {
	  NavigationService.navigationLink = navigationLinks;
	  NavigationService.clearMe();
	  expect(navigationLinks.length).toBe(0);
  }));
  
  it('add nav link', inject(function(NavigationService) {
	  NavigationService.navigationLink = navigationLinks;
	  NavigationService.addNavLink(newNavigationLink[0].title, newNavigationLink[0].stateName, newNavigationLink[0].stateParams);
	  expect(NavigationService.navigationLink).toEqual(newNavigationLink);
  }));
  
  it('clear me', inject(function(NavigationService) {
	  NavigationService.navigationLink = navigationLinks;
	  expect(NavigationService.getNavLinks()).toEqual(newNavigationLink);
  }));
  
});

