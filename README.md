# Welcome to the Program Management Component #
The Program Management Component is responsible for configuration management and UI custom branding.

## License ##
This project is licensed under the [AIR Open Source License v1.0](http://www.smarterapp.org/documents/American_Institutes_for_Research_Open_Source_Software_License.pdf).

## Getting Involved ##
We would be happy to receive feedback on its capabilities, problems, or future enhancements:

* For general questions or discussions, please use the [Forum](http://forum.opentestsystem.org/viewforum.php?f=14).
* Use the **Issues** link to file bugs or enhancement requests.
* Feel free to **Fork** this project and develop your changes!

## Security
Progman security is done differently than most SmarterApp components. It has no runtime dependency upon the Permissions component to do the Role to Permissions cross walk. Progman data has no applied Tenancy, and the following two permissions:
 
* Progman Admin: allows you to modify (create, update, delete) the following:
    * Tenant
    * Compnent
    * Component Configuration Properties
    * Asset Groups (Branding Images)
    * Component Branding
* Progman Read allows you to modify (create, update, delete) the above. *Note*: the read access is granted to most components for bootstrapping configuration values.


Progman will look for the following roles and grant one or both of these permissions as specified:

|Role Name |Permission1|Permission2|
|----|-----------|------|
|Adminstrator|Progman Read|Progman Admin|
|Program Management Admin|Progman Read|Progman Admin|
|Program Management Read|Progman Read|

The above role to permission mapping is implemented by utilizing the Shared Security profile "special.role.required". This profile activates the RoleSpecificPermissionsService implementation of RolesAndPermissionsService interface. Progman specifies this active profile in the -Dspring.profiles.active config in tomcat. 

This profile has a dependency upon a wired implementation of the RoleSpecificPermisionsResolver, which progman has implemented in ProgmanPermissionsResolver (where the above role--}permission binding is codified)

## Usage
### REST Module
The REST module is a deployable WAR file (```prog-mgmnt.rest-VERSION.war```) that provides REST endpoints that can be used to access and modify Program Management data.  The REST module has an internal dependency to the SB11 Program Management Persistence module.

In order to run the REST WAR application, all setup necessary for the Persistence module must be performed.  No additional setup is required other than deploying the WAR to a Tomcat-compatible application server.

### Webapp Module
The Webapp module is a deployable WAR file (```prog-mgmnt.webapp-VERSION.war```) that provides the administrative UI for Program Management functionality.  The Webapp module uses the REST module for all data access, but this is a runtime dependency through a REST endpoint and not a direct code dependency.

The Webapp module requires a few things to be setup in order to run correctly:

* A properties file called rest-endpoints.properties should be created.  This file contains two properties that are required.  An example file is in this module.  This file must be either on the classpath or within the ${SB11_CONFIG_DIR}/progman directory.
* Define the ${SB11_CONFIG_DIR} environment variable to be some directory on the file system.  This could be set as a system variable or a startup variable to Tomcat or other application server.

### Persistence Module
The Persistence module is a JAR artifact that is used by the REST module.  This module is responsible for persistence of application data.  It also encrypts and decrypts sensitive data.

A file named progman-bootstrap.properties should be included in the ${SB11_CONFIG_DIR}/progman directory. This file contains several groups of configurations as detailed below. The directory and file should have very restricted permissions as knowing the password will compromise any encrypted data in the database.  The file will only be read from this configuration location.  It cannot be placed on any other area of the classpath.  If this password is lost, any encrypted data will be unable to be decrypted.

#### MnA properties
* `progman.mna.description` - {a descriptive name for the component used as a display in MnA}
* `mna.mnaUrl` - {url to the base context of the MNA REST application} 
* `oauth.access.url` - {url to OAuth URL to OAM instance to allow client calls to POST to get an OAuth token for any 'machine to machine' calls requiring OAUTH}
* `mna.oauth.client.id` - {OAuth Client id configured in OAM to allow get an OAuth token for the ‘batch' web service call to MnA}
* `mna.oauth.client.secret` - {OAuth Client secret/password configured in OAM to allow get an OAuth token for the ‘batch' web service call to core standard}

#### Mongo Properties
* `pm.mongo.hostname` - {hostname of the mongodb instance}
* `pm.mongo.user` - {mongodb username}
* `pm.mongo.password` - {mongodb password}
* `pm.mongo.dbname` - {mongodb name}

#### PBE properties
Data encryption requires an externally defined property to hold a secret password. Password-Based Encryption (PBE) is used to encrypt any sensitive values in the key value configurations. A salt is recommended but not required (the key must exist but the value may be left blank):

* `pm.pbe.pass.`

In order for encryption of data to work, the unlimited JCE security policy must be installed.  Copy **encryption/UnlimitedJCEPolicy/local_policy.jar** and **encryption/UnlimitedJCEPolicy/US_export_policy.jar** into your JDK's lib/security folder, replacing the existing files (please back up existing files).  See the README.txt in that directory for more details.

#### PM config properties
* `pm.rest.service.endpoint` - {fully qualified URL to base context of the rest webservice}
* `pm.rest.context.root` - {relative path to base context of the rest webservice}
* `pm.minJs` - {whether to use minimized javascript in the browser}
* `progman_resource_check_token_url` - {URL of OpenAM OAuth token check}
* `mna.logger.level` - {level of logging that will be sent to the monitoring and alerting. it defaults to ERROR if not set}

#### PM security properties
* `pm.security.saml.keystore.user` - {the cert for accessing SSO server via https)
* `pm.security.saml.keystore.pass` - {password for cert to access SSO server via https}
* `pm.security.dir` - {file:///opt/... (fully qualified path to location of saml metatdata files)}
* `pm.rest.saml.metadata.filename` - {name of the saml metadata file for the REST app contained in the security.dir configured above}
* `pm.webapp.saml.metadata.filename` - {name of the saml metadata file for the WEBAPP app contained in the security.dir configured above}
* `pm.security.idp` - {fully qualified path to the SAML 2 IDP}

#### Logback configs
logback configurations can also be placed in this file. These are optional and can be configured in the application's existing logback.xml file instead:

* `logfile.path` - {/path/to/wherever/logs/should/go/; e.g. /usr/local/tomcat/logs}
* `app.base.package.name` - program-management
* `app.context.name` - org.opentestsystem.shared.progman
* `app.base.package.loglevel` - debug

### Domain Module
The domain module contains all of the domain beans used to model the Program Management data as well as code used as search beans to create Mongo queries.  It is a JAR artifact that is used by other modules.

## Build
These are the steps that should be taken in order to build all of the Program Management related artifacts.

### Pre-Dependencies
* Mongo 2.0 or higher
* Tomcat 6 or higher
* Maven (mvn) version 3.X or higher installed
* Java 7
* Access to sb11-shared-build repository
* Access to sb11-shared-code repository
* Access to sb11-rest-api-generator repository
* Access to sb11-program-management repository

### Build order

* sb11-shared-build
* sb11-shared-code
* sb11-rest-api-generator
* sb11-program-management

## Dependencies
Program Management has a number of direct dependencies that are necessary for it to function.  These dependencies are already built into the POM files.

### Compile Time Dependencies
* Apache Commons IO
* Apache Commons Beanutils
* Jackson Datatype Joda
* Google Guava
* Hibernate Validator
* Apache Commons File Upload
* Jasypt
* SB11 Shared Code
	* Logback
	* SLF4J
	* JCL over SLF4J
	* Spring Core
	* Spring Beans
	* Spring Data MongoDb
	* Mongo Data Driver
	* Spring Context
	* Spring WebMVC
	* Spring Web
	* Spring Aspects
	* AspectJ RT
	* AspectJ Weaver
	* Javax Inject
	* Apache HttpClient
	* JSTL API
	* Apache Commons Lang
	* Joda Time
	* Jackson Core
	* Jackson Annotations
	* Jackson Databind
* SB11 REST API Generator
	* JSTL
	* Apache Commons Lang

### Test Dependencies
* Spring Test
* Hamcrest
* JUnit 4
* Flapdoodle
* Podam
* Log4J over SLF4J

### Runtime Dependencies
* Servlet API
* Persistence API