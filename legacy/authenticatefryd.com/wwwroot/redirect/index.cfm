<cfif StructKeyExists(URL,"type") AND StructKeyExists(URL,"client")>
	<cfparam name="session.activity_id" default="">
	<cfparam name="local.client_id" default="">
	
	<cfquery name="getClientId" datasource="#application.datasource#">
	SELECT client_id
	FROM #application.schema#.client
	WHERE company_name = <cfqueryparam cfsqltype="cf_sql_varchar" value="#URL.client#">	
	</cfquery>
	
	<cfif getClientId.recordcount GT 0>
		<cfset local.client_id = getClientId.client_id>
	</cfif>
		
	<cfquery name="insertRedirect" datasource="#application.datasource#">
	INSERT INTO `#application.schema#`.`redirect`
	(`activity_id`,
	`instagram`,
	`facebook`,
	`twitter`,
	`snapchat`,
	`website`,
	`create_dt`,
	`client_id`)
	VALUES
	(<cfqueryparam cfsqltype="cf_sql_numeric" value="#session.activity_id#" null="#NOT IsNumeric(session.activity_id)#">,
	<cfif StructKeyExists(URL,"type") AND URL.type EQ 'ig'>
		<cfqueryparam cfsqltype="cf_sql_bit" value="1">
	<cfelse>
		<cfqueryparam cfsqltype="cf_sql_bit" value="0">
	</cfif>,
	<cfif StructKeyExists(URL,"type") AND URL.type EQ 'fb'>
		<cfqueryparam cfsqltype="cf_sql_bit" value="1">
	<cfelse>
		<cfqueryparam cfsqltype="cf_sql_bit" value="0">
	</cfif>,
	<cfif StructKeyExists(URL,"type") AND URL.type EQ 'tw'>
		<cfqueryparam cfsqltype="cf_sql_bit" value="1">
	<cfelse>
		<cfqueryparam cfsqltype="cf_sql_bit" value="0">
	</cfif>,
	<cfif StructKeyExists(URL,"type") AND URL.type EQ 'sc'>
		<cfqueryparam cfsqltype="cf_sql_bit" value="1">
	<cfelse>
		<cfqueryparam cfsqltype="cf_sql_bit" value="0">
	</cfif>,
	<cfif StructKeyExists(URL,"type") AND URL.type EQ 'ws'>
		<cfqueryparam cfsqltype="cf_sql_bit" value="1">
	<cfelse>
		<cfqueryparam cfsqltype="cf_sql_bit" value="0">
	</cfif>,
	<cfqueryparam cfsqltype="cf_sql_timestamp" value="#now()#">,
	<cfqueryparam cfsqltype="cf_sql_numeric" value="#local.client_id#" null="#NOT IsNumeric(local.client_id)#">
	)
	</cfquery>
		
</cfif>

<!--- use encodeForURL() when embedding links into PDF --->
<cfif StructKeyExists(URL,"url") AND IsValid("URL",URLDecode(URL.url))>
	<cflocation addtoken="no" url="#URLDecode(URL.url)#">
</cfif>

<cfabort>
