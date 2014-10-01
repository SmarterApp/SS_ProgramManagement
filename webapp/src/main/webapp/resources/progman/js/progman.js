
var baseUrl =  '';
//TODO is there a better way to inject base url??;
if(document.getElementById('baseUrl')){
 baseUrl = document.getElementById('baseUrl').value;
}

var progman = angular.module('progman', ['ngRoute', 'ui.state','ui.bootstrap','resettableForm','blueimp.fileupload']);
progman.config(['$stateProvider', '$routeProvider', '$provide', '$httpProvider', function($stateProvider, $routeProvider, $provide, $httpProvider) {
	 //register the interceptor as a service
	  $provide.factory('myHttpInterceptor', function($q) {
			return {
		     'responseError': function(rejection) {
		    	if(rejection.status == 0){
		    		location.reload();
		    	}
		 	    return $q.reject(rejection);
		      }
		    };
	  	});
	  $httpProvider.interceptors.push('myHttpInterceptor');

$stateProvider
    .state('root', {
        url: "/", // root route
        resolve: {
        	navLinks :homeSearchNavResolver
         },        
        views: {
            "pmview": {
                templateUrl: 'resources/progman/partials/home.html',
                controller: 'HomeController'
            }
        }
    })
    .state('home', {
        url: "", // root route
        resolve: {
        	navLinks :homeSearchNavResolver
        }, 
        views: {
            "pmview": {
                templateUrl: 'resources/progman/partials/home.html',
                controller: 'HomeController'
            }
        }
    })
    .state('tenantsearch', {
        url: "/tenantSearch",
        resolve: {
        	 navLinks :homeSearchNavResolver
        },
        views: {
            "pmview": {
                templateUrl: 'resources/progman/partials/tenant-search.html',
                controller: 'TenantListController'
            }
        }
    })
    .state("tenantedit", {
        url: "/tenant/{tenantId}/edit/{tenantName}/{tenantType}", 
        resolve: {
        	loadedData:tenantResolver,
        	navLinks : tenantEditNavResolver
        },
        views: {
        	"pmview": {
	        	templateUrl: 'resources/progman/partials/tenant-form.html',
	        	controller:"TenantEditController"
        	}
        }
    })
    .state('propconfigsearch', {
        url: "/propertyConfigSearch",
        resolve: {
       	 navLinks :homeSearchNavResolver
       },        
        views: {
            "pmview": {
                templateUrl: 'resources/progman/partials/propertyConfig-search.html',
                controller: 'PropertyConfigListController'
            }
        }
    })
    .state('assetGroupSearch', {
        url: "/assetGroupSearch",
        resolve: {
          	 navLinks :homeSearchNavResolver
          },         
        views: {
            "pmview": {
                templateUrl: 'resources/progman/partials/asset-search.html',
                controller: 'AssetGroupListController'
            }
        }
    })
    .state('componentsearch', {
        url: "/componentSearch",
        resolve: {
         	 navLinks :homeSearchNavResolver
         },         
        views: {
            "pmview": {
                templateUrl: 'resources/progman/partials/component-search.html',
                controller: 'ComponentListController'
            }
        }
    })
    .state("propconfighistory", {
        url: "/propertyConfig/{configId}/history", 
        resolve: {
            loadedData:propertyConfigResolver,
            navLinks : propertyConfigNavResolver
        },
        views: {
        	"pmview": {
	        	templateUrl: 'resources/progman/partials/propertyConfig-history.html',
	            controller:'PropertyConfigHistoryController'
        	}
        }
    })
    .state("propconfigedit", {
        url: "/propertyConfig/{configId}/edit/{propConfigName}/{propConfigEnvName}", 
        resolve: {
        	loadedData:propertyConfigResolver,
        	navLinks : propertyConfigNavResolver
        },
        views: {
        	"pmview": {
	        	templateUrl: 'resources/progman/partials/propertyConfig-form.html',
	        	controller:"PropertyEditController"
        	}
        }
    })
	.state("assetgroupnew", {
	    url: "/assetGroup/new/{tenantId}/{componentId}", 
	    resolve: {
	        loadedData:tenantResolver,
	        cloneData: function() { return { data:{}, errors:[] }; },  // placeholder for cloneData
	        navLinks : assetGroupNavResolver
	    },
	    views: {
	    	"pmview": {
	        	templateUrl: 'resources/progman/partials/assetGroup-edit-form.html',
	        	controller:"AssetGroupEditController"
	    	}
	    }
    })
	.state("assetgroupedit", {
	    url: "/assetGroup/edit/{assetGroupId}/{component}", 
	    resolve: {
	        loadedData:assetGroupResolver,
	        cloneData:function() { return { data:{}, errors:[] }; },  // placeholder for cloneData
	        navLinks : assetGroupNavResolver
	    },
	    views: {
	    	"pmview": {
	        	templateUrl: 'resources/progman/partials/assetGroup-edit-form.html',
	        	controller:"AssetGroupEditController"
	    	}
	    }
	})
	.state("assetgroupclone", {
	    url: "/assetGroup/clone/{assetGroupId}", 
	    resolve: {
	    	loadedData:function() { return { data:{}, errors:[] }; },  // placeholder for loadedData
	        cloneData:assetGroupResolver,
	        navLinks : assetGroupNavResolver
	    },
	    views: {
	    	"pmview": {
	        	templateUrl: 'resources/progman/partials/assetGroup-edit-form.html',
	        	controller:"AssetGroupEditController"
	    	}
	    }
	})
	.state("assetPoolEditor", {
	    url: "/assetPoolEditor/{tenantId}", 
	    resolve: {
	        loadedData:assetGroupResolver,
	        navLinks : homeSearchNavResolver
	    },
	    views: {
	    	"pmview": {
	        	templateUrl: 'resources/progman/partials/asset-pool-editor.html',
	        	controller:"AssetPoolEditController"
	    	}
	    }
	})
	.state("skinnable", {
	    url: "/skinnable", 
	    resolve: {
	        navLinks : homeSearchNavResolver
	    },
	    views: {
	    	"pmview": {
	        	templateUrl: 'resources/progman/partials/skinnable-ui.html',
	        	controller:"SkinnableExampleController"
	    	}
	    }
	})
	.state("componentedit", {
        url: "/component/{componentId}/edit/{componentName}", 
        resolve: {
        	loadedData:componentResolver,
        	navLinks : componentNavResolver
        },
        views: {
        	"pmview": {
	        	templateUrl: 'resources/progman/partials/component-form.html',
	        	controller:"ComponentEditController"
        	}
        }
    });    
}]);

//Added Resolver code for Navigation
var tenantEditNavResolver =  ['$stateParams','NavigationService', function ($stateParams, NavigationService) {
	NavigationService.clearMe();
	NavigationService.addNavLink("Home","root", {});
	NavigationService.addNavLink("Tenant Search","tenantsearch", {});
}];

var homeSearchNavResolver =  ['$stateParams','NavigationService', function ($stateParams, NavigationService) {
	NavigationService.clearMe();
	NavigationService.addNavLink("Home","root", {});
}];

var propertyConfigNavResolver =  ['$stateParams','NavigationService', function ($stateParams, NavigationService) {
	NavigationService.clearMe();
	NavigationService.addNavLink("Home","root", {"id": $stateParams.configId});
	NavigationService.addNavLink("Configuration Search","propconfigsearch", {});
}];

var assetGroupNavResolver =  ['$stateParams','NavigationService', function ($stateParams, NavigationService) {
	NavigationService.clearMe();
	NavigationService.addNavLink("Home","root", {"id": $stateParams.configId});
	NavigationService.addNavLink("Asset Search","assetGroupSearch", {});
}];

var componentNavResolver =  ['$stateParams','NavigationService', function ($stateParams, NavigationService) {
	NavigationService.clearMe();
	NavigationService.addNavLink("Home","root", {"id": $stateParams.configId});
	NavigationService.addNavLink("Component Search","componentsearch", {});
}];
//End

var propertyConfigResolver =  ['$stateParams','PropertyConfigService', function ($stateParams, PropertyConfigService) {
	if($stateParams.configId) {
		return PropertyConfigService.loadPropertyConfig($stateParams.configId); 
	} else {
		return {
			data:{name:$stateParams.propConfigName, envName:$stateParams.propConfigEnvName},
			errors:[]
		};
	}	
}];

var tenantResolver = ['$stateParams','TenantService', function ($stateParams, TenantService) {
	if($stateParams.tenantId) {
		return TenantService.loadTenant($stateParams.tenantId); 
	} else {
		return {
			data:{name:$stateParams.tenantName, type:$stateParams.tenantType},
			errors:[]
		};
	}							
}];

var componentResolver = ['$stateParams','ComponentService', function ($stateParams, ComponentService) {
	if($stateParams.componentId) {
		return ComponentService.loadComponent($stateParams.componentId); 
	} else {
		return {
			data:{name:$stateParams.componentName},
			errors:[]
		};
	}							
}];

var assetGroupResolver = ['$stateParams','AssetGroupService', function ($stateParams, AssetGroupService) {
	if ($stateParams.assetGroupId) {
		return AssetGroupService.loadAssetGroup($stateParams.assetGroupId); 
	} else {
		return {
			data:{},
			errors:[]
		};
	}
}];

var assetPoolResolver = ['$stateParams','AssetPoolService', function ( $stateParams, AssetPoolService) {
	if($stateParams.tenantId) {
		return AssetPoolService.assetPool($stateParams.tenantId); 
	}else{
		return {
			data:{},
			errors:[]
		};
	}
}];

$(document).ready(function(){
	var menuli = document.getElementsByClassName('menuli');
	var skipToContent = document.getElementsByClassName('skipToContent');
	
	$(menuli).click(function(){
		var pUrl = $(this).attr('data-ng-click');
		
		// toggle selected className
		$('.menuli.selected').removeClass('selected');
		$(this).addClass('selected');
		
		location.hash = pUrl;
	});
	
	$(menuli).keypress(function(event){
		var pUrl = $(this).attr('data-ng-click');
		
		if(event.which == 13) {
			
			// toggle selected className
			$('.menuli.selected').removeClass('selected');
			$(this).addClass('selected');
			
			location.hash = pUrl;
		}
	});

	$(skipToContent).click(function(){
		var pUrl = $(this).attr('data-ng-click');
		location.hash = pUrl;
	});

	function menuClick(){
		var target = $('.slider-arrow');
		if(target.hasClass('show')){
		    $( ".slider-arrow, .secondary .nav" ).animate({
	          left: "+=221"
			  }, 700, function() {
	            // Animation complete.
	          });
			
			
			  $(".secContent").animate({'margin-left': "240px"}, 700, function(){});
			
			  target.html('&laquo;').removeClass('show').addClass('hide');
	        }
	        else {   	
		    $( ".slider-arrow, .secondary .nav" ).animate({
	          left: "-=221"
			  }, 700, function() {
	            // Animation complete.
	          });
			  
			  $(".secContent").animate({'margin-left': "0px"}, 700, function(){});
			  
			  target.html('&raquo;').removeClass('hide').addClass('show');    
	        }
	}
	
	function selectSlideMenu(selectedLi){
		$('.menuli.selected').removeClass('selected');
		$(selectedLi).addClass('selected');
	}
	
	function slideMenuSelector(locationHash){
		if(locationHash.indexOf('tenant') > -1){
			selectSlideMenu(".manageTenants");
		}else if(locationHash.indexOf('component') > -1){
			selectSlideMenu(".manageComponents");
		}else if(locationHash.indexOf('propertyConfig') > -1){
			selectSlideMenu(".configProperties");
		}else if(locationHash.indexOf('assetPool') > -1){
			selectSlideMenu(".uploadBranding");
		}else if(locationHash.indexOf('assetGroup') > -1){
			selectSlideMenu(".configBranding");
		}else if(locationHash.indexOf('skinnable') > -1){
			selectSlideMenu(".previewBranding");
		}else{
			
		}
		
	}
	// show the slide-menu on every page that is not home.html
	if(location.hash){
		$('.slide-menu').show();
		// restore the selected class on the menu
		slideMenuSelector(location.hash);
	}else{
		$('.slide-menu').hide();
	}
	
	$('.slider-arrow').click(menuClick);
});
	
