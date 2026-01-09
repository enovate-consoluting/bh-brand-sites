<cftry>
<!--- get geolocation --->
<cfif structKeyExists(URL, "ip_address") AND len(trim(URL.ip_address))>
    <cfset clientIp = trim(URL.ip_address)>
<cfelse>
    <cfset clientIp = cgi.REMOTE_ADDR>
</cfif>

<cfif clientIp NEQ "5.10.25.108">
	<cfhttp method="get" result="locData" url="#application.ip_validation_url#/#clientIp#?access_key=#application.ip_validation_key#"></cfhttp>

	<cfif locData.statuscode CONTAINS '200'>

		<cfset local.locDataStruct = DeserializeJSON(locData.filecontent)>
		
		<cfif StructKeyExists(local.locDataStruct,"IP") AND StructKeyExists(getTagData,"tag_id")>
		
			<cfquery name="insertTapLoc" datasource="#application.DataSource#">
			INSERT INTO `#application.schema#`.`tap_location`
			(`tag_id`,
			`ip`,
			`ip_type`,
			`continent_code`,
			`continent_name`,
			`country_code`,
			`country_name`,
			`region_code`,
			`region_name`,
			`city`,
			`zip`,
			`create_dt`,
			`longitude`,
			`latitude`,
			`live`)
			VALUES
			(<cfqueryparam cfsqltype="cf_sql_numeric" value="#getTagData.tag_id#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#local.locDataStruct.ip#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#local.locDataStruct.type#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#local.locDataStruct.continent_code#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#local.locDataStruct.continent_name#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#local.locDataStruct.country_code#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#local.locDataStruct.country_name#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#local.locDataStruct.region_code#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#local.locDataStruct.region_name#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#local.locDataStruct.city#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#local.locDataStruct.zip#">,
			<cfqueryparam cfsqltype="cf_sql_timestamp" value="#now()#">,
			<cfqueryparam cfsqltype="cf_sql_float" value="#local.locDataStruct.longitude#" null="#NOT IsNumeric(local.locDataStruct.longitude)#">,
			<cfqueryparam cfsqltype="cf_sql_float" value="#local.locDataStruct.latitude#" null="#NOT IsNumeric(local.locDataStruct.latitude)#">,
			<cfqueryparam  cfsqltype="cf_sql_bit" value="#getTagData.live#">)			
			</cfquery>				
			
		</cfif>
	<cfelse>
		<cflog file="DnaTag" application="yes" type="warning" text="#application.ip_validation_url#/#cgi.REMOTE_ADDR#?access_key=#application.ip_validation_key# returned #locData.statuscode#">	
	</cfif>
</cfif>

<cfcatch type="any">
	<cflog file="DnaTag" application="yes" type="error" text="#cfcatch.Message# - #cfcatch.Detail#">
</cfcatch>
</cftry>