<div class="modal" id="authModal">
    <div class="modal-dialog verify-modal">
		<div class="modal-content content-verify">

            <!-- Modal body -->
            <div class="verifyInfo">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <div class="IconBox text-center">
                    <img src="../images/verify_success.png" alt="" width="100" id="verifyImg" class="not-verify-img">
                </div>
                <div id="verifyContent" class="text-center">
                    <h5>
                        Authentic product
                    </h5>
                    <img src="../images/<cfoutput>#getClientInfo.large_logo#</cfoutput>" class="color-logo1 success-img" alt="">
                    <h1 class="serial-no">Serial# <cfoutput>#form.code#</cfoutput></h1>
                </div>
			</div>
		</div>
    </div>
</div>