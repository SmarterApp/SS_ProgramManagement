describe('Home Controller ', function() {
  var $scope;
  var $location;
  var homeController;
  var path;
  var httpMock;
  
  //you need to indicate your module in a test
  beforeEach(module('progman'));
 
  beforeEach(inject(function($rootScope, _$location_, $controller, $injector) {
	    //create a scope object for us to use.
	  	$location = _$location_;
	  	$scope = $rootScope.$new();
	  	path = "/localhost";
	  	
	  	httpMock = $injector.get('$httpBackend');
        httpMock.whenGET(/\.html/).respond("");
        httpMock.whenGET(/version/).respond("");
	  	
	  	homeController = $controller('HomeController', {
		      $scope : $scope
	    });
  }));
  
  it('verify we saved the asset group successfully', function() {
	  $scope.go(path);
	  expect($location.path()).toBe(path);
  });
});

