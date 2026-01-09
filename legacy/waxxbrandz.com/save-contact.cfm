<cftry>

    <cfparam name="form.first_name" default="">
    <cfparam name="form.email" default="">
    <cfparam name="form.subject" default="">
    <cfparam name="form.message" default="">
    <cfparam name="form.birthdate" default="">
    <cfparam name="form.phone" default="">
    <cfparam name="form.instagram" default="">

    <cfquery name="contactdata" datasource="#application.DataSource#">
        INSERT INTO `#application.schema#`.`contact_us`
        (
            `client_id`,
            `email`,
            `comments`,
            `name`,
            `phone`,
            `instagram`,
            `birthdate`,
            `subject`
        )
        VALUES
        (
            <cfqueryparam value="#application.client_id#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.email#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.phone#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.message#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.first_name#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.instagram#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.birthdate#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#form.subject#" cfsqltype="cf_sql_varchar">
        )
    </cfquery>




<cfcatch type="any">

    <cfdump var="#cfcatch#" abort="true">

</cfcatch>

</cftry>
