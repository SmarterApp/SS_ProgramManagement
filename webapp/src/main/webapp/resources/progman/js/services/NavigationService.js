progman.factory("NavigationService", function($http){
    return {
    	
    	navigationLink : [],
    	
    	clearMe : function(){
    		this.navigationLink.splice(0, this.navigationLink.length);
    	},
    	
    	addNavLink : function(title, stateName, stateParams){
    
    		this.navigationLink.push({"title":title, "stateName":stateName, "stateParams":stateParams});
    	},
	    
		getNavLinks : function(){
			return	this.navigationLink;
    	}
    };
});;