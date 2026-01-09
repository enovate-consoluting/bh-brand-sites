<cftry>

    <cfparam name="session.client_id" default="">
    <cfparam name="form.name" default="">
    <cfparam name="form.email" default="">
    <cfparam name="form.company" default="">
    <cfparam name="form.comments" default="">    
    <cfparam name="form.phone" default="">

    <cfquery name="contactdata" datasource="#application.DataSource#">
        INSERT INTO `#application.schema#`.`contact_us`
        (
            `client_id`,
            `email`,
            `comments`,
            `name`,
            `phone`,
            `company`
      
        )
        VALUES
        (
            <cfqueryparam value="#session.client_id#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.email#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.comments#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.name#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.phone#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.company#" cfsqltype="cf_sql_varchar">
            
        )
    </cfquery>




<cfcatch type="any">

    <cfdump var="#cfcatch#" abort="true">

</cfcatch>

</cftry>
