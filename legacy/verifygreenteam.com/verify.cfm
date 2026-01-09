<cfinclude template="includes/header.cfm">

    <div id="verify" class="fade-in">
        <div class="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden px-4">
            <div class="absolute top-0 left-0 w-full h-full bg-blue-gradient opacity-10"></div>
            <div
                class="max-w-md w-full space-y-8 bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-700 relative z-10">
                <div class="text-center">
                    <i class="fas fa-check-circle text-green-500 text-5xl sm:text-6xl mb-4"></i>
                    <h2 class="mt-4 text-2xl sm:text-3xl text-white brand-font">PRODUCT VERIFICATION</h2>
                    <p class="mt-2 text-sm text-gray-400 font-sans">Scratch off the label on the back of your box to
                        reveal your authentication code.</p>
                </div>
                <form class="mt-8 space-y-6">
                    <div class="rounded-md shadow-sm -space-y-px">
                        <p class="text-xs text-gray-500 mb-2 font-sans text-center">Secured and powered by
                            TruLock&trade; Technology</p>

                        <div>
                            <label for="code_verify" class="sr-only">Authentication Code</label>
                            <input id="code_verify" name="code_verify" type="text" required
                                class="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 text-base sm:text-sm text-center tracking-widest text-xl uppercase font-sans"
                                placeholder="XXXXXX">
                        </div>
                    </div>
                    <div>
                        <button type="button" id="verifyProductBtn"
                            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 brand-font text-lg tracking-widest">VERIFY
                            NOW</button>
                    </div>
                </form>
                <div id="verify-result" class="hidden text-center mt-4 p-4 rounded bg-gray-900 font-sans"></div>
            </div>
        </div>
    </div>




    <div class="modal fade welcome-modal" id="ErrorModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered max-w-md mx-auto">
            <div class="modal-content !bg-transparent border-0 shadow-none">

                <div class="modal-body p-0">
                    <div class="relative bg-slate-900 rounded-2xl border border-white/10
                     shadow-2xl px-8 py-10 text-center text-white">

                        <div class="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white transition"
                            data-bs-dismiss="modal">
                            <i class="fa-solid fa-circle-xmark text-2xl"></i>
                        </div>

                        <img src="https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/7d8bfb0e-69e7-4330-780a-6a2504ef8b00/public"
                            class="h-16 mx-auto mb-6" alt="logo" />

                        <div class="mb-4 text-6xl">
                            <i class="fas fa-times-circle text-red-500"></i>
                        </div>

                        <h2 id="errorModalTitle" class="text-2xl brand-font text-red-500 mb-2 uppercase tracking-wide">
                            Serial Not Found!
                        </h2>

                        <h6 id="errorModalMessage" class="text-sm text-gray-300 leading-relaxed mb-8">
                            Please Try Again
                        </h6>

                        <button id="btn-sub" data-bs-dismiss="modal" class="group relative w-full flex justify-center py-3 px-4
                       rounded-md text-black bg-red-500
                       hover:bg-red-600
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                       brand-font text-lg tracking-widest">
                            OK
                        </button>

                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- <div class="modal fade welcome-modal" id="ErrorModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="container">
                        <div class="close-modal" data-bs-dismiss="modal">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                        <div class="row align-items-center">
                            <div class="col-md-12">
                                <div class="text-modal">

                                    <h2 id="errorModalTitle">Serial Not Found!</h2>
                                    <h6 id="errorModalMessage">Please Try Again</h6>
                                    <div class="btn-row">
                                        <button class="ThemeBtn" role="button" data-bs-dismiss="modal"
                                            id="btn-sub">OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->

    <div class="modal fade welcome-modal" id="SuccessModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered max-w-md mx-auto">
            <div class="modal-content !bg-transparent border-0 shadow-none">

                <div class="modal-body p-0">
                    <div class="relative bg-slate-900 rounded-2xl border border-white/10
                 shadow-2xl px-8 py-10 text-center text-white">

                        <div class="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white transition"
                            data-bs-dismiss="modal">
                            <i class="fa-solid fa-circle-xmark text-2xl"></i>
                        </div>

                        <img src="https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/7d8bfb0e-69e7-4330-780a-6a2504ef8b00/public"
                            class="h-16 mx-auto mb-6" alt="logo" />

                        <div class="mb-4 text-6xl">
                            <i class="fas fa-check-circle text-green-500"></i>
                        </div>

                        <h2 id="successModalTitle"
                            class="text-2xl brand-font text-green-500 mb-2 uppercase tracking-wide">
                            Success!
                        </h2>

                        <h6 id="successModalMessage" class="text-sm text-gray-300 leading-relaxed mb-8">
                            Product Verified Successfully
                        </h6>

                        <button id="btn-success" data-bs-dismiss="modal" class="group relative w-full flex justify-center py-3 px-4
                   rounded-md text-black bg-green-500
                   hover:bg-green-600
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                   brand-font text-lg tracking-widest">
                            OK
                        </button>

                    </div>
                </div>

            </div>
        </div>
    </div>


    <cfinclude template="includes/footer.cfm"></cfinclude>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        $(document).ready(function () {
            const $productCodeInput = $('#code_verify');
            const $verifyButton = $('#verifyProductBtn');
            const errorModalInstance = new bootstrap.Modal(document.getElementById('ErrorModal'));
            const successModalInstance = new bootstrap.Modal(document.getElementById('SuccessModal'));

            function verificationCode() {
                const productCode = $productCodeInput.val().trim();
                if (productCode === "") {
                    $('#errorModalTitle').text("Input Required!");
                    $('#errorModalMessage').text("Please enter a product code.");
                    errorModalInstance.show();
                    return false;
                }

                $verifyButton.prop('disabled', true).html('Verifying... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');

                $.ajax({
                    url: 'ajax/ajax.cfc?method=verifyProd&code=' + productCode,
                    dataType: 'json',
                    success: function (data) {
                        if (parseInt(data.response) === 1) {
                            $('#successModalTitle').text("Success!");
                            $('#successModalMessage').text(data.message);
                            successModalInstance.show();
                        } else {
                            $('#errorModalTitle').text("Verification Failed!");
                            $('#errorModalMessage').text(data.message);
                            errorModalInstance.show();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("AJAX Error:", status, error, xhr.responseText);
                        $('#errorModalTitle').text("Verification Failed!");
                        $('#errorModalMessage').text("An error occurred during verification. Please try again.");
                        errorModalInstance.show();
                    },
                    complete: function () {
                        $verifyButton.prop('disabled', false).html('Verify Now <i class="material-icons">east</i>');
                    }
                });
            }
            $verifyButton.on('click', verificationCode);
        });
    </script>