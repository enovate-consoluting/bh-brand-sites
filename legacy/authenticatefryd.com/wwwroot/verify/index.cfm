<cfparam name="session.activity_id" default="">
<cfparam name="session.activity_loc_id" default="">
<cfset local.labResults = 'false'>

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

<cfquery name="getClientImages" datasource="#application.datasource#">
SELECT `client_product`.`product_name`,
       `client_product`.`product_image`
FROM `#application.schema#`.`client_product`,
     `#application.schema#`.`client`
WHERE client.client_id = client_product.client_id and
      client.company_name = <cfqueryparam cfsqltype="cf_sql_varchar" value="#application.company_name#">
</cfquery>

<cfset local.allowForTest = false>
<cfif StructKeyExists(URL,"code")>
	<cfset local.allowForTest = true>
	<cfset form.code = URL.code>
</cfif>

<cfif NOT StructKeyExists(form,"code") OR Len(Trim(form.code)) EQ 0>
	<cfset session.response = 'Please enter a code.'>
	<cflocation addtoken="no" url="../">
	<cfabort>
</cfif>

<!---<cfif NOT IsNumeric(Mid(Trim(form.code),2,(Len(form.code) - 1)))>
	<cfset session.response = 'Code not found. This product is not valid. Please contact your vendor.'>
	<cflocation addtoken="no" url="../">
	<cfabort>
</cfif>--->

<cfquery name="getPassword" datasource="#application.datasource#">
SELECT `label_password`.`label_password_id`,
	   `label_password`.`label_pass_detail_id`,
	   `label_password`.`serial_num`,
	   `label_password_detail`.`verify_once`,
	   `label_password_detail`.`verify_once_msg`,
	   `label_password_detail`.`label_validation_msg`,
	   `label_password_detail`.`client_id`,
	   `label_password_detail`.`exclude_from_stats`,
	   `client`.`client_id`,
	   `client`.`company_name`,
	   `client`.`custom_verify_page`,
	   `client`.`large_logo`,
	   `label_password`.`verify_once_override`
FROM `#application.schema#`.`label_password`,
	 `#application.schema#`.`label_password_detail`,
	 `#application.schema#`.`client`
WHERE `label_password_detail`.`label_pass_detail_id` = `label_password`.`label_pass_detail_id` and
	  `label_password_detail`.`active` = 'Y' and
	  `label_password_detail`.`client_id` = `client`.`client_id` and
	  `client`.`company_name` = <cfqueryparam cfsqltype="cf_sql_varchar" value="#application.company_name#"> and
	  `label_password`.`password` = <cfqueryparam cfsqltype="cf_sql_varchar" value="#Trim(form.code)#">
</cfquery>

<cfif getPassword.recordcount EQ 0>
	<cfset session.response = 'Code not found. This product is not valid. Please contact your vendor.'>
	<cflocation addtoken="no" url="../">
	<cfabort>
</cfif>		

<!--- if validation option is enabled, restrict to one retrieval --->
<cfif getPassword.verify_once EQ 'Y' AND getPassword.verify_once_override NEQ 'N'>
	<cfquery name="getValidation" datasource="#application.datasource#">
	SELECT `label_password_validation`.`label_pass_val_id`,
		`label_password_validation`.`label_pass_detail_id`,
		`label_password_validation`.`reset`
	FROM `#application.schema#`.`label_password_validation`,
		 `#application.schema#`.`label_password_detail`
	WHERE `label_password_validation`.`password` = <cfqueryparam cfsqltype="cf_sql_varchar" value="#Trim(form.code)#"> and
		  `label_password_detail`.`label_pass_detail_id` = `label_password_validation`.`label_pass_detail_id` and
		  `label_password_detail`.`active` = 'Y' <!---and
		  `label_password_validation`.`no_lab_result_ind` != <cfqueryparam cfsqltype="cf_sql_bit" value="1">--->
	ORDER BY `label_password_validation`.`label_pass_val_id` DESC
	</cfquery>

	<cfif getValidation.recordcount GT 0 AND getValidation.reset EQ 0>
		<cfset session.response = getPassword.verify_once_msg>
		<cflocation addtoken="no" url="../">
		<cfabort>	
	</cfif>

</cfif>

<cfif IsDefined('getValidation') AND StructKeyExists(getValidation,"reset") AND getValidation.reset EQ 1>
	<cfquery name="nullReset" datasource="#application.datasource#">
	UPDATE `#application.schema#`.`label_password_validation`
	SET `label_password_validation`.`reset` = <cfqueryparam cfsqltype="cf_sql_bit" value="0">
	WHERE `label_password_validation`.`label_pass_val_id` = <cfqueryparam cfsqltype="cf_sql_numeric" value="#getValidation.label_pass_val_id#">	
	</cfquery>
</cfif>

<cfquery name="getLabResults" datasource="#application.datasource#">
SELECT `lab_test_result`.`name`,
	   `lab_test_result`.`file_name`,
	   `lab_test_result`.`link`,
	   `lab_result_type`.`description`		   
FROM `#application.schema#`.`lab_test_result`,
	 `#application.schema#`.`lab_test_label_assoc`,
	 `#application.schema#`.`lab_result_type`
WHERE `lab_test_result`.`client_id` = <cfqueryparam cfsqltype="cf_sql_numeric" value="#getPassword.client_id#"> and
	  `lab_test_result`.`active` = 'Y' and
	  `lab_test_result`.`client_id` = `lab_test_label_assoc`.`client_id` and
	  `lab_result_type`.`result_type_id` = `lab_test_result`.`result_type_id` and
	  `lab_test_label_assoc`.`lab_test_id` = `lab_test_result`.`lab_test_id` and
	  `lab_test_label_assoc`.`password_detail_id` = <cfqueryparam cfsqltype="cf_sql_numeric" value="#getPassword.label_pass_detail_id#">
ORDER BY 1	
</cfquery>	

<!--- do not track activity if exclude_from_stats is checked --->
<cfif getPassword.exclude_from_stats EQ 1>
	<cfset local.activity_id = ''>
	<cfset local.activity_loc_id = ''>
	<cfset local.client_id = ''>
<cfelse>
	<cfset local.activity_id = session.activity_id>
	<cfset local.activity_loc_id = session.activity_loc_id>
	<cfset local.client_id = getPassword.client_id>
</cfif>	

<cfquery name="insertValidation" datasource="#application.datasource#">
INSERT INTO `#application.schema#`.`label_password_validation`
(`label_pass_detail_id`,
`create_dt`,
`IP_addr`,
`password`,
`activity_id`,
`activity_loc_id`,
`reset`,
`no_lab_result_ind`,
`client_id`)
VALUES
(<cfqueryparam cfsqltype="cf_sql_numeric" value="#getPassword.label_pass_detail_id#">,
<cfqueryparam cfsqltype="cf_sql_timestamp" value="#now()#">,
<cfqueryparam cfsqltype="cf_sql_varchar" value="#CGI.Remote_Addr#">,
<cfqueryparam cfsqltype="cf_sql_varchar" value="#Trim(form.code)#">,
<cfqueryparam cfsqltype="cf_sql_numeric" value="#local.activity_id#" null="#NOT IsNumeric(local.activity_id)#">,
<cfqueryparam cfsqltype="cf_sql_numeric" value="#local.activity_loc_id#" null="#NOT IsNumeric(local.activity_loc_id)#">,
<cfqueryparam cfsqltype="cf_sql_bit" value="0">,
<cfif getLabResults.recordcount GT 0>
	<cfqueryparam cfsqltype="cf_sql_bit" value="0">,
<cfelse>
	<cfqueryparam cfsqltype="cf_sql_bit" value="1">,
</cfif>
<cfqueryparam cfsqltype="cf_sql_numeric" value="#local.client_id#" null="#NOT IsNumeric(local.client_id)#">)
</cfquery>

<cfset session.response = ''>	
<cfset session.label_password_id = getPassword.label_password_id>
<cfset session.code = getLabResults.file_name>
<cfset getClientInfo.client_id = getPassword.client_id>

<cfif getLabResults.recordcount EQ 0>
	<cfquery name="getAllClientLabResults" datasource="#application.datasource#">
	SELECT `lab_test_result`.`file_name`,
		   `lab_test_result`.`name`
	FROM `#application.schema#`.`lab_test_result`
	WHERE `lab_test_result`.`client_id` = <cfqueryparam cfsqltype="cf_sql_numeric" value="#getClientInfo.client_id#"> and
		  `lab_test_result`.`active` = 'Y'
	ORDER BY 2
	</cfquery>	
</cfif>

<!DOCTYPE html>
<html>
   <head>
      <title>Fryd</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta charset="UTF-8">
	  <link rel="stylesheet" href="../css/bootstrap.min.css">
      <link rel="stylesheet" type="text/css" href="../css/style.css" />
      <link rel="stylesheet" type="text/css" href="../css/font-awesome.css" />
      <link rel="stylesheet" type="text/css" href="../css/animate.css" />
      <link rel="stylesheet" type="text/css" href="../css/hover.css" />
	  <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
   </head>
   <body>
   <section class="main-banner2">
      <div class="header">
         <div class="container">
            <div class="d-flex wow fadeInDown">
               <div>
                  <!---<a href="../">
                  <img src="../images/logo.png" class="logo" alt="">
                  </a>--->
               </div>
			   <cfif getLabResults.recordcount GT 0>								
				   <cfset local.labResults = 'true'>			   

				  <div class="dropdown">
					 <cfoutput>
							<input type="hidden" name="clientName" id="clientName" value="#getClientInfo.company_name#">
							<cfif getLabResults.recordcount GT 0>								
								<cfset local.labResults = 'true'>
																		
									<cfif getLabResults.description EQ 'PDF'>
										<select id="lab_results" class="form-control">										
									<cfelse>										
										<cfif Len(getLabResults.name) GT 17>
											<select id="lab_results_link" class="form-control" onChange="javascript: if (this.value.length > 0) {window.open(this.value, '_blank') || window.location.replace(this.value)};" style="font-size:12px;">
										<cfelse>
											<select id="lab_results_link" class="form-control" onChange="javascript: if (this.value.length > 0) {window.open(this.value, '_blank') || window.location.replace(this.value)};">
										</cfif>
									</cfif>
									
									<option selected="selected" value="">Lab Results</option>
									
									<cfloop query="getLabResults">
										<cfif getLabResults.description EQ 'PDF'>
											<option value="viewer.html?file=#getLabResults.file_name#">#getLabResults.name#</option>
										<cfelse>										
											<option value="#getLabResults.link#">#getLabResults.name#</option>
										</cfif>
									</cfloop>
								</select>																					
							</cfif>
					
					</cfoutput>
				  </div>

			   </cfif>
            </div>	
			<cfif getLabResults.recordcount GT 0>
				<div id="lab-result-container" style="display:none; padding-top:15px;">
				   <div class="row">
					  <div class="col-lg-12">		
						 <iframe id="frame" src="" style="width:100%; min-height:800px; overflow:scroll; position:relative;border:none;z-index:0;"></iframe>
					  </div>
					</div>
					<div class="row">
						<div class="col-lg-12" style="height:100px;">&nbsp;</div>
					</div>					
				</div>
			</cfif>				
			<!-- d-flex -->
            <div class="header-text">
               <div class="row">
                  <div class="col-lg-offset-1 col-lg-10">
                     <div class="row">
                        <div class="col-md-6 col-lg-5">
                           <p class="text-center wow fadeInLeft">
						   	  <cfoutput>
                                <img src="../images/#getClientInfo.large_logo#" class="logo" alt="">
							  </cfoutput>
                           </p>
                        </div>
                        <div class="col-md-6 col-lg-6 wow fadeInRight">
                           <h1>Stay <em>Connected</em> and <span class="block"></span>
                              Up to Date with <cfoutput>#getClientInfo.company_name#<input type="hidden" name="clientName" id="clientName" value="#getClientInfo.company_name#"></cfoutput>
                           </h1>
                           <div class="newsletter">
						   		<div class="input-glow rounded-6">
                              		<form class="newsletter-form">							     
								 	<input type="email" name="email" id="email" placeholder="Enter email address" onFocus="this.placeholder = ''" onBlur="this.placeholder = 'Enter email address'">
                                 	<button type="button" id="email-contact" class="button updates-btn">GET UPDATES</button>								 
                              		</form>
							  </div>
                           </div>
						   <h2 class="flw">Follow us:
								<cfoutput>
									<a href="#application.hostName#/redirect/?type=ig&url=https%3A%2F%2Fwww.linktr.ee%2Ffrydextracts&client=#EncodeForURL(getClientInfo.company_name)#" target="_blank"><img src="../images/linktree.png" alt="" style="width:60px; height:auto;"></a>
								</cfoutput>	
							</h2>
                           <!---<h2>Follow us:</h2>
                           <ul class="follow-us">
						   	  <cfoutput>
						   	  <cfif Len(getClientInfo.instagram) GT 0>
                              <li>
                                 <a href="#application.hostName#/redirect/?type=ig&url=https%3A%2F%2Fwww.instagram.com%2F#getClientInfo.instagram#&client=#EncodeForURL(getClientInfo.company_name)#" target="_blank"><img src="../images/instagram.png" alt=""></a>
                              </li>
							  </cfif>
							  <cfif Len(getClientInfo.snapchat) GT 0>
                              <li>
                                 <a href="#application.hostName#/redirect/?type=sc&url=https%3A%2F%2Fwww.snapchat.com%2Fadd%2F#getClientInfo.snapchat#&client=#EncodeForURL(getClientInfo.company_name)#" target="_blank"><img src="../images/icon2.png" alt=""></a>
                              </li>
							  </cfif>
							  <cfif Len(getClientInfo.website) GT 0>
                              <li>
                                 <a href="#application.hostName#/redirect/?type=ws&url=http%3A%2F%2F#getClientInfo.website#&client=#EncodeForURL(getClientInfo.company_name)#" target="_blank"><img src="../images/icon3.png" alt=""></a>
                              </li>
							  </cfif>
							  </cfoutput>
                           </ul>--->
                        </div>
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
							<img src="../images/#getClientImages.product_image#" alt="" style="border-radius:25px;">
						 </div>
					 </cfoutput>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- image-section -->
	  <cfset verifyPath = true>
	  <cfinclude template="../includes/authentication_popup.cfm">
      <!-- footer -->
      <cfinclude template="../includes/footer.cfm">
      <!-- footer -->
      <script type="text/javascript" src="../js/jquery.js"></script>
      <script type="text/javascript" src="../js/bootstrap.min.js"></script>
      <script type="text/javascript" src="../js/index.js"></script>
      <script type="text/javascript" src="../js/wow.js"></script>
      <script>
         $(function () {
         $('[data-toggle="popover"]').popover()
         })


         new WOW().init();
         
      </script>
	  
	  <cfoutput>
		<script>
		$( document ).ready(function() {
			
			$('##lab_results').on('change', function() {
				var sel = document.getElementById("lab_results");
				var selVal = sel.options[sel.selectedIndex].value;	

				if (selVal == "Home" || selVal == "") {
					$('##lab-result-container').hide();
					$('.image-section').show();
					$('.header-text').show();							
				} else {
					var iframe = $('##frame');
					iframe.attr('src',selVal);
					$('.image-section').hide();
					$('.header-text').hide();
					$('##lab-result-container').show();			
				}
						
			});		
			
			$('##email-contact').on('click', function () {
				var emailAddr = $('##email').val();
				
				if (emailAddr != '') {
					$('##email-contact-msg').html('&nbsp;');
					$('##email-contact').html('<img src="/images/dot-transparent-animated-gif-original.gif" />');
					$.ajax({
						url: '/email_contact.cfm?email=' + emailAddr,  
						method: 'post', 
						data: null,
						success: function(data) {
							if ($.trim(data) == 'Thanks!') {
								$('##email-contact').attr("disabled", true);
								$('##email-contact').html(data);
								$('##email-contact').addClass('send-success');
							} else {
								$('##email-contact').html('Get Updates');
								$('##email-contact-msg').html(data);
							}
						}				
					});					
				}
				
			});
			
			$('##lab_results,##lab_results_link').on('change', function () {
				var selectedOption = $('##lab_results').find(":selected").text();
					
				if (selectedOption == 'Home') {
					$('select option:contains("Home")').text('Lab Results');
				} else {
					$('select option:contains("Lab Results")').text('Home');
				}						
			});

			$('##authModal').modal('show');
		
		});
		</script>
		</cfoutput>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
		
		<script>
		var video = document.getElementById('hive-video');
		
		function toggleMute(){
		  video.muted = !video.muted;
		}			
		</script>
				
		<style>		
		.swal2-title {
			font-family: 'Roboto';		
			font-weight:normal;
			color: #747474;		
		}
		.swal2-icon.swal2-success .swal2-success-ring {
			border: .25em solid rgba(18, 98, 180, 0.6);	
		}
		.swal2-icon.swal2-success [class^=swal2-success-line] {
			background-color:rgba(18, 98, 180, 0.7);			
		}
		
		</style>	
		</section>  
   </body>
</html>
