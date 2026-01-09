<cfparam name="URL.debug" default="false">
<cfif NOT StructKeyExists(URL,"id")>
    <cfabort>
</cfif>
<cftry>
    <cfset local.key = 'zQmbEXgl2pYjf4f8xdA1/g=='>
    <cfset local.decryptedId = Decrypt(URL.id,local.key,'BLOWFISH','Hex')>
<cfcatch type="any"></cfcatch>
</cftry>
<cfif StructKeyExists(local,"decryptedId") AND IsNumeric(local.decryptedId)>
    <!--- query DB --->
    <cfquery name="getTagData" datasource="#application.datasource#">
    SELECT `tag`.`tag_id`,
           `tag`.`seq_num`,
           `tag`.`product_page`,
           `tag`.`live`
    FROM `#application.schema#`.`tag`
    WHERE `tag`.`seq_num` = <cfqueryparam cfsqltype="cf_sql_numeric" value="#local.decryptedId#">
    </cfquery>
    
    <cfif StructKeyExists(URL,"showTagId")>
        <cfoutput>Tag Number: #getTagData.seq_num#</cfoutput>
        <cfabort>
    </cfif>
    <cfif getTagData.live NEQ 1>
        <cfinclude template="inactive.cfm">
        <cfabort>
    </cfif>
    
    <!--- log metrics --->
    <cfinclude template="store-metrics.cfm">
    
    <!--- redirect to product_page --->
    <cfif getTagData.product_page EQ 'https://www.scanacart.com/get_app.cfm' AND URL.debug EQ false>
        <cfif FindNoCase("Android", CGI.HTTP_USER_AGENT)>
            <!--- Redirect for Android devices --->
            <cfset appScheme = 'market://launch?id=com.enovate.scanacart'>
        <cfelseif FindNoCase("iPhone", CGI.HTTP_USER_AGENT) or FindNoCase("iPad", CGI.HTTP_USER_AGENT)>
            <!--- Redirect for iPhone or iPad devices --->
            <!---<cfset storeUrl = "https://apps.apple.com/us/app/scanacart/id1544242035">--->
            <cfset appScheme = "https://scanacartnfc.page.link/nMQh">
        </cfif>
        <cflocation url="#appScheme#" addToken="false">
    <cfelseif IsValid("URL",getTagData.product_page) AND URL.debug EQ false>
        <cflocation addtoken="no" url="#getTagData.product_page#?id=#URL.id#">        
    <cfelseif LCase(URL.debug) EQ 'true'>
        <cfoutput><h1>Tag number: #local.decryptedId#</h1></cfoutput>
    <cfelse>
        <h1>This tag has not yet been configured</h1>
    </cfif>
</cfif>