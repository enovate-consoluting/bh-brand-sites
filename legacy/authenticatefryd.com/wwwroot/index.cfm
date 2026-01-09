<cfparam name="URL.code" default="">
<cfif (NOT StructKeyExists(session,"activity_id") OR session.activity_id EQ "") AND StructKeyExists(session,"sessionid")>

	<cfquery name="insertActivity" datasource="#application.datasource#" result="activity">
	INSERT INTO `#application.schema#`.`activity`
	(`activity_start_dt`,
	`activity_session_id`)
	VALUES
	(<cfqueryparam cfsqltype="cf_sql_timestamp" value="#now()#">,
	 <cfqueryparam cfsqltype="cf_sql_varchar" value="#session.sessionid#">)
	</cfquery>
	
	<cfset session.activity_id = activity.GENERATED_KEY>
</cfif>


<cfquery name="getClientInfo" datasource="#application.datasource#">
SELECT email_addr,
       company_name,
       instagram,
       facebook,
       website,
       twitter,
       snapchat,
       logo_path,
       logo_width,
       logo_height,
	   large_logo,
	   client_id
FROM #application.schema#.client
WHERE company_name = <cfqueryparam cfsqltype="cf_sql_varchar" value="#application.company_name#"> and
      large_logo is not null
</cfquery>

<cfset session.client_id = getClientInfo.client_id>

<cfquery name="getClientImages" datasource="#application.datasource#">
SELECT `client_product`.`product_name`,
       `client_product`.`product_image`
FROM `#application.schema#`.`client_product`,
     `#application.schema#`.`client`
WHERE client.client_id = client_product.client_id and
      client.company_name = <cfqueryparam cfsqltype="cf_sql_varchar" value="#application.company_name#">
</cfquery>

<!DOCTYPE html>
<html>
   <head>
      <title>Fryd</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta charset="UTF-8">
	  <link rel="stylesheet" href="css/bootstrap.min.css">
      <link rel="stylesheet" type="text/css" href="css/style.css" />
      <link rel="stylesheet" type="text/css" href="css/font-awesome.css" />
      <link rel="stylesheet" type="text/css" href="css/animate.css" />
      <link rel="stylesheet" type="text/css" href="css/hover.css" />
	  <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
	<link href="images/favicon-16x16.png" rel="icon" type="image/png">
	<link href="images/favicon-32x32.png" rel="icon" type="image/png">
   </head>
   <body>
	<section class="main-banner">
		<!-- <div class="video-wrapper">
			<video src="images/kaws_opt.mp4" autoplay muted loop playsinline style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; object-fit: cover;">
			</video>
	   </div> -->
      <div class="header">
         <div class="container">
            <div class="d-flex wow fadeInDown">
               <div>
                  <!---<a href="../">
                  <img src="images/logo.png" class="logo" alt="">
                  </a>--->
               </div>
            </div>				
			<!-- d-flex -->
            <div class="header-text">
               <div class="row">
                  <div class="col-lg-offset-1 col-lg-10">
					<div class="row">
						<div class="col-md-3"></div>
                        <div class="col-md-6">
                           <p class="text-center wow fadeInLeft">						   
						   	  <cfoutput>
                              <img src="images/#getClientInfo.large_logo#" class="color-logo buz" alt="">
							  </cfoutput>
                           </p>
                        </div>
						<div class="col-md-3"></div>
					</div>
					<div class="row">
						<div class="col-md-3"></div>
                        <div class="col-md-6 wow fadeInRight">							
							<h1 class="verify">VERIFY YOUR PRODUCT</h1>
							<div class="newsletter">
									<div class="input-glow rounded-6">
									<form class="newsletter-form" action="verify/" enctype="multipart/form-data" method="post">										
										<cfoutput>
										<input type="text" name="code" id="verify_box" placeholder="ENTER PRODUCT CODE" onFocus="this.placeholder = ''" onBlur="this.placeholder = 'Enter product code'" value="#URL.code#">
										</cfoutput>
										<button type="submit" class="btn verify-btn">VERIFY</button>
									</form>
									</div>
									<p class="verify-once-message">
										<cfif StructKeyExists(session,"response") AND Len(session.response) GT 0>
											<cfoutput>#session.response#</cfoutput>
										</cfif>
									</p>	
									<h2 class="flw">Follow us:
										<cfoutput>
										<a href="<cfoutput>#application.hostName#/redirect/?type=ig&url=https%3A%2F%2Fwww.instagram.com%2F#getClientInfo.instagram#&client=#EncodeForURL(getClientInfo.company_name)#</cfoutput>" target="_blank">
											<a href="#application.hostName#/redirect/?type=ig&url=https%3A%2F%2Fwww.linktr.ee%2Ffrydextracts&client=#EncodeForURL(getClientInfo.company_name)#" target="_blank"><img src="images/linktree.png" alt="" style="width:60px; height:auto;"></a>
										</a>
										</cfoutput>
									</h2>
									<!---<ul class="follow-us">
									<cfoutput>
									<cfif Len(getClientInfo.instagram) GT 0>
									<li>
										<a href="#application.hostName#/redirect/?type=ig&url=https%3A%2F%2Fwww.instagram.com%2F#getClientInfo.instagram#&client=#EncodeForURL(getClientInfo.company_name)#" target="_blank"><img src="images/ig-icon.png" alt=""></a>
									</li>
									</cfif>
									<cfif Len(getClientInfo.snapchat) GT 0>
									<li>
										<a href="#application.hostName#/redirect/?type=sc&url=https%3A%2F%2Fwww.snapchat.com%2Fadd%2F#getClientInfo.snapchat#&client=#EncodeForURL(getClientInfo.company_name)#" target="_blank"><img src="images/icon2.png" alt=""></a>
									</li>
									</cfif>
									<cfif Len(getClientInfo.website) GT 0>
									<li>
										<a href="#application.hostName#/redirect/?type=ws&url=http%3A%2F%2F#getClientInfo.website#&client=#EncodeForURL(getClientInfo.company_name)#" target="_blank"><img src="images/icon3.png" alt=""></a>
									</li>
									</cfif>
									</cfoutput>
									</ul>	--->					  
							</div>							
                        </div>
						<div class="col-md-3"></div>
					</div>
					<!-- inner-row -->
                  </div>
               </div>
            </div>			
         </div>
         <!-- container -->
      </div>
	
      <!-- header -->
      <div class="image-section">
         <div class="container">
            <div class="row">
               <div class="col-lg-offset-1 col-lg-10">
                  <div class="row">
				  	 <cfoutput query="getClientImages">
						 <div class="col-sm-4 col-md-4 wow fadeInLeft">
							<img src="images/#getClientImages.product_image#" alt="" style="border-radius:25px;">
						 </div>
					 </cfoutput>
                  </div>
               </div>
            </div>
         </div>

		  <!-- image-section -->

	 
	  
      </div>
	 <!-- footer -->
      <cfinclude template="includes/footer.cfm">
      <!-- footer -->
	</section>
     
  
      <script type="text/javascript" src="js/jquery.js"></script>
      <script type="text/javascript" src="js/bootstrap.min.js"></script>
      <script type="text/javascript" src="js/index.js"></script>
      <script type="text/javascript" src="js/wow.js"></script>
      <script>
         $(function () {
         $('[data-toggle="popover"]').popover()
         })


         new WOW().init();
         
      </script>	  
	  
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
		
		<script>
		var video = document.getElementById('hive-video');
		
		function toggleMute(){
		  video.muted = !video.muted;
		}			
		</script>
   </body>
</html>
