<cfif (NOT StructKeyExists(session,"activity_id") OR session.activity_id EQ "") AND StructKeyExists(session,"sessionid")>
	<cfquery name="insertActivity" datasource="#application.datasource#" result="activity">
        INSERT INTO `#request.schema#`.`activity`
            (
                `activity_start_dt`,
                `activity_session_id`
            )
        VALUES
            (
                <cfqueryparam cfsqltype="cf_sql_timestamp" value="#now()#">,
                <cfqueryparam cfsqltype="cf_sql_varchar" value="#session.sessionid#">
            )
	</cfquery>
	
	<cfset session.activity_id = activity.GENERATED_KEY>
</cfif>

<cfoutput>
    <script>
        $( document ).ready(function() {
            // set endpoint and your access key
            var ip = '#cgi.REMOTE_ADDR#'
            var access_key = '#application.ip_validation_key#';
            // get the API result via jQuery.ajax
            $.ajax({
                url: '#application.ip_validation_url#/' + ip + '?access_key=' + access_key,   
                dataType: 'jsonp',
                success: function(json) {
                    $.ajax({
                        url: 'geolocation_save.cfm',  
                        method: 'post', 
                        data: json,
                        dataType: 'jsonp',
                        success: function() {}
                    });
                }
            });
        });	
    </script>
</cfoutput>