progman.factory("TenantTypeService", function($http){
    return {
    	errorHandler : function (response) {
    		var returnVal = {
    				data : {},
    				errors : []
    		};
    		for(var field in response.data.messages){
             	for(var messages in response.data.messages[field]) {
             		returnVal.errors.push(response.data.messages[field][messages]);
             	}
     		}
    		return returnVal;
    	},
    	
    	successHandler: function(response) {
    		return  {
    				data : response.data,
    				errors : []
    		};
        },
    	
    	loadAllTenantTypes : function() {
    		var url = baseUrl + 'tenantTypes/?_=' + Math.random();
	    	return $http.get(url).then(this.successHandler, this.errorHandler);
	    }
    };
});