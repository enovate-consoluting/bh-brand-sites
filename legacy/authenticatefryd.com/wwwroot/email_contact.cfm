<cfif NOT StructKeyExists(URL,"email")>
	<cfabort>
</cfif>

<cfif IsValid("email",URL.email)>
	
	<cftry>
	
		<cfparam name="session.client_id" default="">
		<cfparam name="session.activity_id" default="">
		
		<!---store in database---> 
		<cfquery name="insertEmailMsg" datasource="#application.datasource#">
		INSERT INTO `#application.schema#`.`email_update`
		(`email_addr`,
		`create_dt`,
		`activity_id`,
		`client_id`)
		VALUES
		(
		<cfqueryparam cfsqltype="cf_sql_varchar" value="#URL.email#">,
		<cfqueryparam cfsqltype="cf_sql_timestamp" value="#now()#">,
		<cfqueryparam cfsqltype="cf_sql_numeric" value="#session.activity_id#" null="#NOT IsNumeric(session.activity_id)#">,
		<cfqueryparam cfsqltype="cf_sql_numeric" value="#session.client_id#" null="#NOT IsNumeric(session.client_id)#">
		)
		</cfquery>
		
		Thanks!
		
		<!--- send email 
		<CFMAIL to = "#application.emailTo#" 
				from = "support@scanacart.com"
				replyto="#form.email66#"
				username="admin@scanacart.com"
				subject = "Inquiry From scanacart.com"
				password = "#application.emailPass#" 
				port="587"
				useSSL="no"
				server="mail.serverdb1-Scanacart-vps.vps.ezhostingserver.com"
				type="html">
			<cfoutput>
			<table width="600" border="0" cellpadding="8">
			  <tr>
				<td align="right" valign="top" width="100"><b>From:</b></td>
				<td>#form.name#</td>
			  </tr>
			  <tr>
				<td align="right" valign="top"><b>Email:</b></td>
				<td>#form.email66#</td>
			  </tr>
			  <tr>
				<td align="right" valign="top"><b>Message</b></td>
				<td>#form.message#</td>
			  </tr>
			</table>			
			</cfoutput>
		</CFMAIL>--->	
				
	<cfcatch type="any">
		<cffile action="append" file="#application.rootFolder#logs\log.txt" output="#cfcatch.Detail# #cfcatch.Message#" addnewline="yes">--->
		<cfheader statuscode="500" statustext="An unexpected error has occurred">
		An unexpected error has occurred
	</cfcatch>
	</cftry>
	
<cfelse>
	Email Address is Invalid
</cfif>