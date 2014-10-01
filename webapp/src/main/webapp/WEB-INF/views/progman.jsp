<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>

<!doctype html>
<html data-ng-app="progman" id="ng-app">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <title>Program Management - Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <jsp:include page="${includePath}/css-includes.jsp"></jsp:include>
    <script src="${pmBaseUrl}resources/js/nothing.js"></script>
</head>

<!--[if IE]><![endif]-->
<!--[if IE 8 ]>    <body class="ie8">    <![endif]-->
<!--[if IE 9 ]>    <body class="ie9">    <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<body>
<!--<![endif]-->
    <input type="hidden" id="baseUrl" value="${pmBaseUrl}" />
   <div class="container">
      <a id="skipNavigation" class="skipToContent" data-ng-click="#mainContent" href="#mainContent">Skip to Main Content</a>
      <div class="header">
            <div class="info">
                <ul>
                    <li>Logged in as: ${user}</li>
                    <li><a href="saml/logout">Logout</a></li>
                </ul>
            </div>
            <div class="banner" role="banner">
                <span class="logo"><a href="#"><img src="resources/progman/images/logo_sbac.png" alt="Smerter Balanced Assessmnet Consortium" name="SBAC_logo"></a></span>
                <span class="homeBtn dropdown">
                    <button class="boxBtn" onClick="javascript:location.href='#'">
                        <span class="btnIcon icon_sprite icon_home2" aria-hidden="true"></span>
                        <span class="btnText">Home</span>
                    </button>
                 </span>
                <div class="title"><h1 tabindex="-1" role="heading">Program Management Dashboard</h1></div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
    <div class="slide-menu">
		<div class="content secondary"> 
		    <div class="nav" data-accessible-table role="navigation">
			    <ol>
				    <li class="menuli manageTenants green selected" data-ng-click="#/tenantSearch" tabindex="0" title="Manage Tenants" role="button">Manage Tenants<span></span>
				    	<p>Create and manage tenants for multi-tenant components</p></li>
				    <li class="menuli manageComponents navy" data-ng-click="#/componentSearch" tabindex="0" title="Manage Components" role="button">Manage Components<span></span>
				    	<p>Create and manage components <br>
				    	for tenant subscriptions</p>
				    </li>
				    <li class="menuli configProperties maroon" data-ng-click="#/propertyConfigSearch" tabindex="0" title="Configure Component Properties" role="button">Configure Component Properties<span></span>
						<p>Create and manage properties <br>
				  		for component configurations</p>
				    </li>
				    <li class="menuli uploadBranding navy" data-ng-click="#/assetPoolEditor/" tabindex="0" title="Upload Branding Images" role="button">Upload Branding <br>Images<span></span>
				      <p>Upload component customized <br>
				      branding images</p>
				    </li>
					<li class="menuli configBranding maroon" data-ng-click="#/assetGroupSearch" tabindex="0" title="Configure Component Branding" role="button">Configure Component Branding<span></span>
						<p>Configure component branding <br>
				  		for tenants</p>
					</li>
					<li class="menuli previewBranding green" data-ng-click="#/skinnable" tabindex="0" title="Preview Component Branding" role="button">Preview Component Branding<span></span>
						<p>Preview branding settings with 
						a built-in test component
						</p>
					</li>
				</ol>
			</div>
		
		<a href="javascript:void(0);" class="slider-arrow" role="button" tabindex="0" value="Menu-Slider Button">&raquo;</a>
		</div>
    </div>
    <div id="mainContent" class="content" role="main" tabindex="-1"> 
        <div data-ui-view="pmview">
        </div>
    </div>

    <div class="clear"></div>


<jsp:include page="${includePath}/js-includes.jsp"></jsp:include>
    
</body>
    
</html>
