
progman.factory("AssetPoolService", function($http, $q, $rootScope){
    return  {
    	loadAssetPool : function(tenantId){
    			var url = baseUrl + 'assetPool/tenant/' + tenantId + '?_=' +Math.random();
   				return $http.get(url).then(this.successHandler, this.errorHandler);
    	},
    	
    	saveAssetPool : function(assetPool){
    		var method = 'POST';
    		var url = baseUrl + 'assetPool';
    		if(assetPool.id){
				method = 'PUT';
				url += '/' + assetPool.id;
			}
			return $http({
					method: method,
					url: url,
					data: assetPool
					}).then(this.successHandler, this.errorHandler);
    	},
    	
    	deleteAssetFromPool : function(poolId, fileId){
    		var method = 'DELETE';
    		var url = baseUrl + 'assetPool/'+ poolId +'/assetFile/'+ fileId;
			return $http({
					method: method,
					url: url});
    	},
    	
    	uploadFile : function(assetGroupId, assetName, file) {
   	    	    var defer = $q.defer();
    			var data = new FormData();
   	    	    data.append('assetFile', file);
              	var uploadUrl = baseUrl + 'assetGroup/' + assetGroupId+ "/assetName/" + assetName + "/assetFile" ;
              	var success = this.successHandler;
              	var eHandler = this.errorHandler;
              	$.ajax({
            	    	    url: uploadUrl,
            	    	    data: data,
            	    	    cache: false,
            	    	    contentType: false,
            	    	    processData: false,
            	    	    type: 'POST',
            	    	    success: function(data){
            	    	    	var res = success({data:data});
            	    	    	res.assetName = assetName;
            	    	    	defer.resolve(res);
            	    	    	$rootScope.$apply();
            	    	    },
            	    	    error: function(response, status, error){
            	    	    	var errorObj = angular.fromJson(response.responseText);
            	    	    	defer.resolve(eHandler({data:errorObj}));
            	    	    	$rootScope.$apply();
            	    	    }
              	     });
    		return defer.promise;
    	},
    	
    	
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
        }
    	
    };
});