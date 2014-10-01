progman.factory("PropertyConfigService", function($http){
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
			
	        savePropertyConfig : function(data){
				var url = baseUrl + 'propertyConfig';
				if(data.id){
		    		url = url+'/'+ data.id;
		    		return $http.put(url, data).then(this.successHandler, this.errorHandler);
		    	}else{
		    		return $http.post(url, data).then(this.successHandler, this.errorHandler);
		    	}
	        },
	        
	        deletePropertyConfig : function(id){
	        	var method = 'DELETE';
	    		var url = baseUrl + 'propertyConfig/' + id;
				return $http({
						method: method,
						url: url
						}).then(this.successHandler, this.errorHandler);
	        },
		
			loadPropertyConfig : function(id){
					//added random value to the query in order to avoid caching in IE
					var url = baseUrl + 'propertyConfig/'+ id + '/?_=' + Math.random();
					return $http.get(url).then(this.successHandler, this.errorHandler);
			}
	};
});