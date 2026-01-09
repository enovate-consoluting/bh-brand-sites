<cftry>

    <cfparam name="form.name" default="">
    <cfparam name="form.email" default="">
    <cfparam name="form.license" default="">
    <cfparam name="form.comment" default="">
    <cfparam name="form.phone" default="">


    <cfquery name="details" datasource="#application.DataSource#">
        INSERT INTO `#application.schema#`.`contact_us`
        (
            `client_id`,
            `email`,
            `comments`,
            `name`,
            `phone`,
            `License_no`

        )
        VALUES
        (
            <cfqueryparam value="#application.client_id#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.email#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.comment#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.name#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.phone#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.license#" cfsqltype="cf_sql_varchar">
        )
    </cfquery>




<cfcatch type="any">

    <cfdump var="#cfcatch#" abort="true">

</cfcatch>

</cftry>
