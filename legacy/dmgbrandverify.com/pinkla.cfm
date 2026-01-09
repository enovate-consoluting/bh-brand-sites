<cfset scancount = 0>

<cftry>
	<cfif StructKeyExists(URL,"id")>
		<cfset local.key = 'zQmbEXgl2pYjf4f8xdA1/g=='>
		<cfset local.decryptedId = Decrypt(URL.id,local.key,'BLOWFISH','Hex')>
		
		<cfquery name="getTagData" datasource="#application.datasource#">
			SELECT `tag`.`tag_id`,
				   `tag`.`seq_num`,
				   `tag`.`product_page`,
				   `tag`.`live`,
				   `tag`.`video_url`
			FROM `#application.schema#`.`tag`
			WHERE `tag`.`seq_num` = <cfqueryparam cfsqltype="cf_sql_numeric" value="#local.decryptedId#">
		</cfquery>
		
		<cfquery name="getScanCount" datasource="#application.datasource#">
			SELECT 
				count(tap_location.tap_loc_id) as cnt 
			FROM 
				#application.schema#.tap_location
			INNER JOIN
				tag
			ON
				tap_location.tag_id = tag.tag_id
			WHERE
				tag.seq_num = <cfqueryparam cfsqltype="cf_sql_numeric" value="#local.decryptedId#">
		</cfquery>
		<cfset scancount = getScanCount.cnt>
		
		<cfif getTagData.recordCount EQ 0>
			<cfinclude template="../inactive.cfm">
			<cfabort>
		</cfif>
	<cfelse>
		<cfinclude template="../inactive.cfm">
		<cfabort>
	</cfif>
	<cfcatch>
		<cfinclude template="../inactive.cfm">
		<cfabort>
	</cfcatch>
</cftry>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>DMG Hats</title>
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="fonts/stylesheet.css">
        <link rel="stylesheet" href="css/master.css">

        <style>



            .video-overlay {
                position: absolute;
                inset: 0;
                background: url('img/HEARTS.png') center / cover no-repeat;
                z-index: 2;
                pointer-events: none;
            }
   
        </style>
    </head>

    <body>

        <section class="verification-wrapper">

            <div class="video-background">
                <img src="img/BACKGROUND COLOR.png" alt="">
            </div>

            <div class="video-overlay"></div>

            <div class="verify-inputbox">
                <div class="verifyInfo">

                    <div class="verify-btn">
                        <img src="img/LOVERS ONLY TITLE.png" alt="">
                    </div>

                    <div class="IconBox">
                        <img src="img/Pink Hat.png" alt="">
                    </div>

                    <div class="product-text">
                        <h4>Scan Counter: <span><cfoutput>#scancount#</cfoutput></span></h4>
                    </div>

                    <div class="imageicon">
                        <a href="" target="_blank">
                            <img src="img/authentic hat text.png" alt="">
                        </a>
                    </div>

                    <div class="cap_logo">
                        <img src="img/brand logo.png" alt="">
                    </div>

                </div>
            </div>

        </section>
        <script src="js/jquerymin.js"></script>
        <script src="js/bootstrap.js"></script>

    </body>

</html>