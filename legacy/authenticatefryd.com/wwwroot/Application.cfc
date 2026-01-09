<cfcomponent output="false">

	<cfset this.name = "authenticatefryd">
	<cfset this.sessionManagement = "yes">
	<cfset this.sessionTimeout = "#CreateTimeSpan(0,4,0,0)#"> <!--- 4 hours --->
	<cfset this.scriptProtect = "all">
	
	<cffunction name="onApplicationStart" access="public" returntype="boolean" output="false">
			<cfset application.DataSource = 'scanacart'>
			<cfset application.schema = 'scanacart'>
			<cfset application.ip_validation_url = 'https://api.ipstack.com'>
			<cfset application.ip_validation_key = 'REDACTED'>
			<cfset application.emailPass = 'REDACTED'>
			<cfset application.company_name = 'Happy Extracts'>
			
			<cfif DirectoryExists('C:\home\authenticatefryd.com')>				
				<cfset application.rootFolder = 'C:\home\authenticatefryd.com\'>
				<cfset application.testResultFolder = 'C:\home\authenticatefryd.com\verify\'>
				<cfset application.hostName = 'https://www.authenticatefryd.com'>
				<cfset application.emailTo = 'support@scanacart.com'>			
			<cfelse>
				<cfset application.rootFolder = 'C:\ColdFusion2016\cfusion\wwwroot\scan-a-cart\qa\'>
				<cfset application.hostName = 'http://localhost:8500/scan-a-cart/qa/'>
				<cfset application.emailTo = 'genikz@yahoo.com'>
			</cfif>
			
			<cfreturn true>
	</cffunction>	
	
	<cffunction name="onRequestStart">
		<cfif IsDefined("url.init")>
			<cfset onApplicationStart()>
		</cfif>
		<cfreturn true>
	</cffunction>		
	
	<cffunction name="onError" returnType="void" output="true">
		<cfargument name="exception" required="true">
		<cfargument name="eventname" type="string" required="true">
		<cfset var errortext = "">
	
		<cflog file="#application.rootFolder#logs/log.txt" text="#arguments.exception.message#">
		
		<cfsavecontent variable="errortext">
		<cfoutput>
		An error occurred: http://#cgi.server_name##cgi.script_name#?#cgi.query_string#<br />
		Time: #dateFormat(now(), "short")# #timeFormat(now(), "short")#<br />
		
		<cfdump var="#arguments.exception#" label="Error">
		<cfdump var="#form#" label="Form">
		<cfdump var="#url#" label="URL">
		
		</cfoutput>
		</cfsavecontent>
		
		<CFMAIL to = "genikz@yahoo.com" 
				from = "support@scanacart.com"
				username="postmaster@mg.scanacart.com"
				subject = "Error: #arguments.exception.message#"
				password = "#application.emailPass#" 
				port="587"
				useTLS="yes"
				server="smtp.mailgun.org"
				type="html">		
			#errortext#
		</cfmail>
		
		<cflocation url="https://www.choicesverify.com/error.cfm" addtoken="no">
		
	</cffunction>	

</cfcomponent>