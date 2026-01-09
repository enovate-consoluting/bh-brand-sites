<!---<cffile action="write" file="#ExpandPath('.')#\test.txt" output="">--->
<cfif StructKeyExists(form,"ip")>
	<!--- to prevent duplicate database entries, only store data is IP has changed for this session --->
	<cfif NOT StructKeyExists(session,"user_ip") OR (StructKeyExists(session,"user_ip") AND session.user_ip NEQ form.ip) OR (NOT StructKeyExists(session,"activity_loc_id") OR session.activity_loc_id EQ "")>
		<!---<cffile action="append" file="#ExpandPath('.')#\test.txt" output="#now()# - #session.activity_id#">--->	
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

<!---
{
  "ip": "134.201.250.155",
  "hostname": "134.201.250.155",
  "type": "ipv4",
  "continent_code": "NA",
  "continent_name": "North America",
  "country_code": "US",
  "country_name": "United States",
  "region_code": "CA",
  "region_name": "California",
  "city": "Los Angeles",
  "zip": "90013",
  "latitude": 34.0453,
  "longitude": -118.2413,
  "location": {
    "geoname_id": 5368361,
    "capital": "Washington D.C.",
    "languages": [
        {
          "code": "en",
          "name": "English",
          "native": "English"
        }
    ],
    "country_flag": "https://assets.ipstack.com/images/assets/flags_svg/us.svg",
    "country_flag_emoji": "????",
    "country_flag_emoji_unicode": "U+1F1FA U+1F1F8",
    "calling_code": "1",
    "is_eu": false
  },
  "time_zone": {
    "id": "America/Los_Angeles",
    "current_time": "2018-03-29T07:35:08-07:00",
    "gmt_offset": -25200,
    "code": "PDT",
    "is_daylight_saving": true
  },
  "currency": {
    "code": "USD",
    "name": "US Dollar",
    "plural": "US dollars",
    "symbol": "$",
    "symbol_native": "$"
  },
  "connection": {
    "asn": 25876,
    "isp": "Los Angeles Department of Water & Power"
  },
  "security": {
    "is_proxy": false,
    "proxy_type": null,
    "is_crawler": false,
    "crawler_name": null,
    "crawler_type": null,
    "is_tor": false,
    "threat_level": "low",
    "threat_types": null
  }
}
--->

