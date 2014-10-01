
progman.controller('SkinnableExampleController',['$scope','$state', 'TenantService','AssetGroupService','ComponentService',
    function($scope, $state, TenantService, AssetGroupService, ComponentService) {
		
		$scope.componentList = [];
		$scope.userAttributeParams = {};
		$scope.tenantFound = {};
		
		ComponentService.loadAllComponents(500).then(function(response){
			$scope.componentList = response.data.searchResults;
		});
		
		$scope.userInputMode = 'true';
		$scope.showAddUserView = false;
		$scope.newuser = {};
		
		
		resetNewUserValues();
		addUserDefaultUsers();
		
		$scope.stateGroup = "";
		$scope.state = "";
		$scope.districtGroup = "";
		$scope.district = "";
		$scope.institution = "";
		
		$scope.tenant = {};
		$scope.tenancyChain = {};
		
		$scope.clearValues = function(){
			$scope.tenant = null;
			$scope.assetGroup = null;
			$scope.title = '';
			$scope.logoSrc = '/';
			$scope.memeSrc = '/';
			$scope.headerbackground = {"background-color":"white"};
			$scope.mainbackground = {"background-color":"white"};		
		};

		$scope.addNewUser = function(){
			$scope.addingUser = true;
			resetNewUserValues();
			$scope.showAddUserView = true;
		};
		
		$scope.cancelAddNewUser = function(){
			$scope.addingUser = false;
			$scope.showAddUserView = false;
		};
		
		$scope.filterTenants = function(searchVal,pageSize) {
  			return TenantService.findTenantsBySearchVal(searchVal,'0',pageSize,'name','asc').then(function(loadedData){
  				return loadedData.data;
  	  		});
  		};
		
		$scope.saveUser = function(){
			$scope.addingUser = false;
			var user = JSON.parse(JSON.stringify($scope.newuser));
			$scope.users.push(user);
			$scope.showAddUserView = false;
		};
		
		$scope.changeUser = function(){
					var user = $scope.currentUser;
					$scope.client = user.client;
	   				$scope.stateGroup = user.stateGroup;
	   				$scope.state = user.state;
	   				$scope.districtGroup = user.districtGroup;
	   				$scope.district = user.district;
	   				$scope.institution = user.institution;
	   				$scope.updateskin();
		};
		
		$scope.attributeChanged = function(arg1, arg2){
			$scope[arg2] = arg1.name;
			$scope.updateskin();
		};
		
		
   		$scope.updateskin = function(){
   				$scope.userAttributeParams = {
   					"CLIENT" :  $scope.client,
	   				"STATE_GROUP" :  $scope.stateGroup,
	   				"STATE" : $scope.state,
	   				"DISTRICT_GROUP" : $scope.districtGroup,
	   				"DISTRICT" : $scope.district,
	   				"INSTITUTION" :  $scope.institution
	   			};
   				$scope.tenantFound = {};
	   			
	   			TenantService.loadTenancyChain($scope.userAttributeParams).then( function(response){
	   				$scope.tenancyChain = {};
	   				if(response.errors.length === 0){
	   					$scope.tenancyChain = response.data.tenants;
	   					angular.forEach($scope.tenancyChain, function(tenant){
	   						$scope.tenantFound[tenant.type] = true;
	   					});
	   					findAssetGroupForEachChainLink();
	   				}
	   			});
	   			
	   			if($scope.component){
		   			AssetGroupService.loadAssetForSkinning($scope.component.name , $scope.userAttributeParams).then(function(response){
		   				$scope.clearValues();
		   				if(response.errors.length === 0){
			   				$scope.assetGroup = response.data;
			   				$scope.loadTenant();
			   				for(var index in $scope.assetGroup.assets){
			   					var asset = $scope.assetGroup.assets[index];
			   					if(asset.name === "logo"){
			   						$scope.logoSrc = asset.url;
			   					}else if(asset.name === "title"){
			   						$scope.title = asset.property;
			   					}else if(asset.name === "header-background"){
			   						$scope.headerbackground = {"background-color":asset.property};
			   					}else if(asset.name === "main-background"){
			   						$scope.mainbackground = {"background-color":asset.property};
			   					}else if(asset.name === "meme"){
			   						$scope.memeSrc = asset.url;
			   					}
			   				}
		   				}
		   			});
	   			}
   		};
   		
   		function findAssetGroupForEachChainLink() {
   			for(var index in $scope.tenancyChain) {
   				var tenant = $scope.tenancyChain[index];
   				var params = { };
   				params[tenant.type] = tenant.name; 
   				if($scope.component){
	   				AssetGroupService.loadAssetForSkinning($scope.component.name , params).then(function(response){
	   					if(response.data){
		   					for(var i in $scope.tenancyChain) {
		   		   				var tenant = $scope.tenancyChain[i];
		   		   				if(tenant.id == response.data.tenant.id){
		   		   					tenant.hasAssetGroup = "(has asset group defined)";
		   		   				}
		   					}
			   			}
		   			});
   				}
   			}
   		};
   		
   		$scope.loadTenant = function(){
   			if($scope.assetGroup != null && $scope.assetGroup.tenant){
	   			TenantService.loadTenant($scope.assetGroup.tenant.id).then(function(response){
	   				$scope.tenant = response.data;
	   			});
   			}
   		};
   		
   		$scope.clearValues();
   		
   		function resetNewUserValues(){
			$scope.newuser.name = '';
			$scope.newuser.client = '';
			$scope.newuser.stateGroup = '';
			$scope.newuser.state = '';
			$scope.newuser.districtGroup = '';
			$scope.newuser.district = '';
			$scope.newuser.institution = '';
		};
		
   		
   		function addUserDefaultUsers() {
   			var user1 = {
   					name : 'Joe Middleton',
   					stateGroup:'SB',
   					state : 'WI',
   					districtGroup : 'WI_STH_GRP',
   					district : 'WI_M-CPSD_DIST_200',
   					institution : 'WI_M-CPSD_SCHOOL_1'
   			};
   			var user2 = {
   					name : 'Jane West',
   					stateGroup:'SB',
   					state : 'WI',
   					districtGroup : 'WI_STH_GRP',
   					district : 'WI_MMSD_DIST_200',
   					institution : 'Madison - West'
   			};
   			var user3 = {
   					name : 'Jack Washington',
   					stateGroup:'SB',
   					state : 'WA',
   					districtGroup : 'WA_NRTH_GRP',
   					district : 'WA_ZSD_DIST_200',
   					institution : 'Washington School'
   			};
   			
   			var user4 = {
   					name : 'John Doe',
   					stateGroup:'SB',
   					state : '',
   					districtGroup : '',
   					district : '',
   					institution : ''
   			};
   			
   			
   			var user5 = {
   					name : 'Nobody',
   					stateGroup:'',
   					state : '',
   					districtGroup : '',
   					district : '',
   					institution : ''
   			};
   			
   			var user6 = {
   					name : 'Wobbly Bob',
   					stateGroup:'SWC',
   					state : 'WI',
   					districtGroup : '',
   					district : '',
   					institution : ''
   			};
   			
   			var user7 = {
   					name : 'Lost Soul',
   					stateGroup:'NOTHINGNESS',
   					state : 'STATELESS',
   					districtGroup : '',
   					district : 'WHATS_A_DISTRICT',
   					institution : 'IM_NOT_SURE'
   			};
   			
   			$scope.users = [user1,user2,user3,user4,user5,user6,user7];
   		}
	
	}
]);

