progman.factory("TenantService", function($http){
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
    	
	    saveTenant : function(tenantData){
	    	var method = 'POST';
	    	var url = baseUrl + 'tenant';
			if(tenantData.id){
				method = 'PUT';
				url += '/' + tenantData.id;
			}
	    	return $http({
				method: method,
				url: url,
				data: tenantData
			}).then(this.successHandler, this.errorHandler);
	    },

	    loadTenant : function(id) {
	    		var url = baseUrl + 'tenant/'+ id + '/?_=' + Math.random();
   				return $http.get(url).then(this.successHandler, this.errorHandler);
	    },
	    
	    loadAllTenants : function() {
	    	return $http({
	            method: 'GET',
	            url: baseUrl + 'tenants' + '/?_=' + Math.random()
	   	    }).then(this.successHandler, this.errorHandler);
	    },
	    
	    findTenantsBySearchVal : function(searchVal,tenantType,page,pageSize,pageSort,pageSortDir) {
            var queryString = '?searchVal=' + searchVal;
            queryString += (tenantType ? '&tenantType=' + tenantType : '');
            queryString += (page ? '&page=' + page : '&page=0');
	    	queryString += (pageSize ? '&page.size=' + pageSize : '');
	    	queryString += (pageSort ? '&page.sort=' + pageSort : '');
	    	queryString += (pageSortDir ? '&page.sort.dir=' + pageSortDir : '');
	    	
	    	return $http({
	            method: 'GET',
	            url: baseUrl + 'tenantsBySearchVal' + queryString + '&_=' + Math.random()
	   	    }).then(this.successHandler, this.errorHandler);
	    },
	    
	    //TODO move to tenancyChainService
		loadTenancyChain : function(params){
			var url = baseUrl + 'tenantchain';
			params["_="] =  Math.random();
			return $http.get(url,{"params":params}).then(this.successHandler, this.errorHandler);
    	}
    };
});