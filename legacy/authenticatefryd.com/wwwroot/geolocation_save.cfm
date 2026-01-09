<cfif StructKeyExists(form,"ip")>
	<!--- to prevent duplicate database entries, only store data is IP has changed for this session --->
	<cfif NOT StructKeyExists(session,"user_ip") OR (StructKeyExists(session,"user_ip") AND session.user_ip NEQ form.ip) OR (NOT StructKeyExists(session,"activity_loc_id") OR session.activity_loc_id EQ "")>
		<!--- save all data to database --->	
		
		<cfif StructKeyExists(session,"activity_id") AND IsNumeric(session.activity_id)>
			<cfquery name="insertActivityLocation" datasource="#application.datasource#" result="activity_loc">
			INSERT INTO `#application.schema#`.`activity_location`
			(`activity_id`,
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
			`latitude`,
			`longitude`,
			`create_dt`)
			VALUES
			(<cfqueryparam cfsqltype="cf_sql_numeric" value="#session.activity_id#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#form.ip#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#form.type#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#form.continent_code#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#form.continent_name#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#form.country_code#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#form.country_name#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#form.region_code#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#form.region_name#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#form.city#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#form.zip#">,
			<cfqueryparam cfsqltype="cf_sql_float" value="#form.latitude#" null="#NOT IsNumeric(form.latitude)#">,
			<cfqueryparam cfsqltype="cf_sql_float" value="#form.longitude#" null="#NOT IsNumeric(form.longitude)#">,
			<cfqueryparam cfsqltype="cf_sql_timestamp" value="#now()#">)			
			</cfquery>
			
			<cfset session.activity_loc_id = activity_loc.GENERATED_KEY>
		</cfif>
		
	</cfif>
	
	<cfset session.user_ip = form.ip>
</cfif>