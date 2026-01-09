<cfinclude template="includes/header.cfm">
  <main class="wrapperd z-[1] relative w-full h-full">
    <!-- <section class="relative w-full h-screen z-[1]"> -->

    <section class="relative w-full min-h-screen flex flex-col">
      <cfinclude template="includes/top-bar.cfm">

        <div class="absolute inset-0 -z-[1] bg-cover bg-center bg-no-repeat"
          style="background-image: url('/assets/images/VerifyPat.svg')">
        </div>

        <div
          class="flex flex-col items-center justify-center w-full h-full px-4 sm:px-6 lg:px-10 py-10 sm:mt-[0rem] sm:mt-[7rem] mt-[4rem] sm:mb-[7rem]">
          <div class="flex flex-col items-center text-center space-y-2 mb-8">
            <h1 class="font-medium text-2xl sm:text-3xl md:text-5xl lg:text-7xl flex justify-between">Verify Your <img
                src="assets/images/stealthyLogo.svg" alt="logo" 
                class="w-24 sm:w-32 lg:w-[37%] varify-logo md:pt-[8px] md:pl-[8px] pl-[6px]"></h1>
          </div>

          <div class="w-full max-w-lg relative mb-10">
            <input placeholder="Verify Your Product..." id="product-code" name="product-code" type="text"
              class="peer w-full py-3 sm:py-4 pl-4 pr-24 rounded-full bg-[#E9E9E9] placeholder:text-gray-500 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:drop-shadow-lg text-sm sm:text-base">
            <button
              class="absolute right-2 top-1/2 -translate-y-1/2 py-2 px-4 sm:px-6 rounded-full bg-gray-900 text-sm sm:text-base font-semibold text-white transition-all duration-200 ease-in-out hover:bg-black cursor-pointer"
              id="verify-btn">
              Verify Now
            </button>
          </div>
          <div class="w-full flex justify-center z-[-1]">
            <img src="assets/images/threeDevices.png"
              class="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl h-auto object-contain devices"
              style="transform: scale(1.3);" alt="Devices">
          </div>
        </div>
    </section>

    <!-- popup module start -->

    <div class="z-5">
      <div id="modal"
        class="fixed inset-0 flex items-center justify-center bg-[#000000c2] bg-opacity-50 hidden z-[9999]">
        <div class="bg-white rounded-lg shadow-lg relative max-w-sm w-full p-[30px]">
          <button id="closeModal"
            class="absolute top-3 right-3 text-[#000000c2] hover:text-[#000] text-2xl cursor-pointer">&times;</button>
          <div class="text-center">
            <div class="font-medium">
              <img src="assets/images/error.png" alt="Error" class="w-[120px] h-[120px] mx-auto">
              <h5 id="serial-num-invalid" class="font-bold mt-2 text-red-600">Please enter a code.</h5>
              <div class="pt-4">
                <button id="okayBtn" class="bg-[#000] text-white px-4 py-[7px] rounded-md shadow-md cursor-pointer">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>




    <div id="successModal"
      class="fixed inset-0 flex items-center justify-center bg-[#000000c2] bg-opacity-50 hidden z-[9999] font-medium">
      <div class="bg-white rounded-lg shadow-lg relative max-w-sm w-full p-6">
        <button id="closeModal"
          class="absolute top-3 right-3 text-[#000000c2] hover:text-[#000] text-2xl cursor-pointer">&times;</button>
        <div class="text-center">
          <div>
            <img src="assets/images/stealthyLogo.svg" alt="Logo" class="w-[190px] pt-[20px] mx-auto">
            <img src="assets/images/verified.png" alt="Success" class="w-[100px] mx-auto">
            <h2 class="text-xl font-bold text-[#00d566]">Verified</h2>
            <h6 class="text-gray-600">Product Verified Successfully</h6>
            <div class="pt-4">
              <button id="succss_okayBtn"
                class="bg-[#000] text-white px-4 py-[7px] rounded-md shadow-md cursor-pointer">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- popup module end -->


    <cfinclude template="includes/bottom-bar.cfm">
  </main>
  <cfinclude template="includes/footer.cfm">
    <script>
      $(document).ready(function () {
        $("#verify-btn").on("click", function () {
          var productCode = $("#product-code").val();

          if (productCode !== "") {
            $.ajax({
              url: "verify/?code=" + productCode,
              method: "POST",
              timeout: 5000,
              statusCode: {
                200: function () {

                  $("#serial-num-valid").html("Serial " + productCode);
                  $("#successModal").removeClass("hidden");
                  $("#modal").addClass("hidden");
                },
                400: function (data) {
                  $("#serial-num-invalid").html(data.statusText);
                  $("#modal").removeClass("hidden");
                  $("#successModal").addClass("hidden");
                },
                500: function (xhr) {

                  $("#modal").removeClass("hidden");
                  $("#successModal").addClass("hidden");
                },
              },
            });
          } else {
            $("#serial-num-invalid").html("Please enter a code.");
            $("#modal").removeClass("hidden");
            $("#successModal").addClass("hidden");
          }
        });
        $("#closeModal, #okayBtn, #succss_okayBtn").on("click", function () {
          $("#modal").addClass("hidden");
          $("#successModal").addClass("hidden");
        });
      });
    </script>




    <!-- popup module js start

    <script>
 
      $(document).ready(function () {
        $("#verify-btn").on("click", function () {
          $("#modal").removeClass("hidden");
        });

        $("#closeModal, #okayBtn").on("click", function () {
          $("#modal").addClass("hidden");
        });
      });
    </script>

<script>
 
  $(document).ready(function () {
    $("#verify-btn").on("click", function () {
      $("#successModal").removeClass("hidden");
    });

    $("#successModal, #succss_okayBtn").on("click", function () {
      $("#successModal").addClass("hidden");
    });
  });
</script>
 -->