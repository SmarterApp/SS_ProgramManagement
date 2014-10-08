progman.factory("ComponentService", function($http){
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
    	
	    saveComponent : function(componentData){
	    	var method = 'POST';
	    	var url = baseUrl + 'component';
			if(componentData.id){
				method = 'PUT';
				url += '/' + componentData.id;
			}
	    	return $http({
				method: method,
				url: url,
				data: componentData
			}).then(this.successHandler, this.errorHandler);
	    },

        deleteComponent : function(id) {
        	var method = 'DELETE';
    		var url = baseUrl + 'component/' + id;
			return $http({
				method: method,
				url: url
				}).then(this.successHandler, this.errorHandler);
        },

	    loadComponent : function(id) {
	    		var url = baseUrl + 'component/'+ id + '/?_=' + Math.random();
   				return $http.get(url).then(this.successHandler, this.errorHandler);
	    },

	    loadAllComponents : function(pageSize) {
	    	var queryString = '?sortKey=name&sortDir=asc&pageSize=' + (isNaN(pageSize) ? '10' : pageSize) + '&';
	    	queryString += '_=' + Math.random();
	    	return $http({
	            method: 'GET',
	            url: baseUrl + 'component/' + queryString
	   	    }).then(this.successHandler, this.errorHandler);
	    }
    };
});