<cfinclude template="includes/header.cfm">
    <main class="wrapperd z-[1] relative w-full h-full">

        <section class="relative w-full min-h-screen flex flex-col">
            <cfinclude template="includes/top-bar.cfm">

                <div class="absolute inset-0 -z-[1] bg-cover bg-center bg-no-repeat"
                    style="background-image: url('/assets/images/VerifyPat.svg')">
                </div>

                <div
                    class="flex flex-col items-center justify-center w-full h-full px-4 sm:px-6 lg:px-10 py-10 sm:mt-[0rem] sm:mt-[7rem] mt-[4rem] sm:mb-[7rem] gap-5">
                    <div class="flex flex-col items-center text-center space-y-2">
                        <h1 class="font-medium text-5xl sm:text-7xl md:text-8xl lg:text-9xl flex">
                            Patent Pending...
                        </h1>
                    </div>

                    <div class="w-full flex justify-center z-[-1]">
                        <img src="assets/images/threeDevices.png"
                            class="w-full max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-3xl h-auto object-contain devices"
                            style="transform: scale(1.3);" alt="Devices">
                    </div>
                </div>
        </section>



        <cfinclude template="includes/bottom-bar.cfm">
    </main>
    <cfinclude template="includes/footer.cfm">