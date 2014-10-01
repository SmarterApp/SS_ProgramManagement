
progman.factory("AssetGroupService", function($http, $q, $rootScope){
    return  {
    	
    	loadAssetGroup : function(id){
    			var url = baseUrl + 'assetGroup/'+ id + '/?_=' + Math.random();
   				return $http.get(url).then(this.successHandler, this.errorHandler);
    	},
    	
    	saveAssetGroup : function(assetGroup){
    		var method = 'POST';
    		var url = baseUrl + 'assetGroup';
    		if(assetGroup.id){
				method = 'PUT';
				url += '/' + assetGroup.id;
			}
			return $http({
					method: method,
					url: url,
					data: assetGroup
					}).then(this.successHandler, this.errorHandler);
    	},
    	
    	copyAssetGroup : function(assetGroup){
    		var method = 'POST';
    		var url = baseUrl + 'assetGroup';
    		if(assetGroup.id){
				method = 'PUT';
				url += '/copy/' + assetGroup.id;
			}
			return $http({
					method: method,
					url: url,
					data: assetGroup
					}).then(this.successHandler, this.errorHandler);
    	},
    	
    	deleteAssetGroup : function(assetGroup){
    		var method = 'DELETE';
    		var url = baseUrl + 'assetGroup/remove/' + assetGroup.id;
			return $http({
					method: method,
					url: url
					}).then(this.successHandler, this.errorHandler);
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
    	
    	loadAssetForSkinning : function(componentName, params){
			var url = baseUrl + 'skinnableAssets/'+ componentName;
			params["_="] =  Math.random();
			return $http.get(url,{"params":params}).then(this.successHandler, this.errorHandler);
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