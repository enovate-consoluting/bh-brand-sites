<cfinclude template="includes/header.cfm">


    <main class="flex-grow">

        <div id="home" class="fade-in">
            <div
                class="w-full relative h-[calc(100vh-5rem)] flex items-center justify-center bg-black overflow-hidden group">
                <div class="video-container">
                    <iframe id="hero-stream"
                        src="https://customer-19w1a8y0iapg9msz.cloudflarestream.com/914eb6e41c06c047cc9cd3aacb846129/iframe?muted=true&loop=true&autoplay=true&controls=false&poster=https%3A%2F%2Fcustomer-19w1a8y0iapg9msz.cloudflarestream.com%2F914eb6e41c06c047cc9cd3aacb846129%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
                        class="video-iframe pointer-events-none" style="border: none;"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowfullscreen="true"></iframe>
                </div>
                <div
                    class="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10">
                </div>
                <div
                    class="absolute bottom-8 left-0 w-full flex flex-col items-center justify-center z-10 animate-bounce-slow pointer-events-none">
                    <span class="brand-font text-green-400 tracking-widest text-lg mb-2 text-outline">SCROLL DOWN</span>
                    <i class="fas fa-chevron-down text-white text-2xl drop-shadow-md"></i>
                </div>
            </div>

            <div class="relative overflow-hidden min-h-[80vh] flex items-center liquid-gradient-anim">
                <div
                    class="max-w-7xl mx-auto w-full relative h-full flex flex-col lg:block items-center justify-center pt-8 pb-16 lg:py-0">

                    <div
                        class="order-1 lg:order-none lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center z-10 lg:z-10 mb-8 lg:mb-0">
                        <div id="flavor-animator"
                            class="w-[300px] h-[400px] lg:w-[360px] lg:h-[500px] bg-transparent rounded-3xl flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform rotate-3 relative overflow-hidden">
                            <div id="flavor-icon-container"
                                class="w-full h-full absolute inset-0 flex items-center justify-center p-4">
                                <img src="https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/a28e9673-e802-4947-d509-82f5eb30b000/public"
                                    class="w-full h-full object-contain drop-shadow-2xl opacity-100 transition">
                            </div>
                        </div>
                    </div>

                    <div
                        class="order-2 lg:order-none relative z-20 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 px-4 sm:px-6 lg:px-8">
                        <main class="mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
                            <div class="text-center lg:text-left">
                                <h1
                                    class="text-4xl sm:text-5xl md:text-7xl tracking-tight text-white brand-font text-outline leading-tight mb-4">
                                    <span class="block xl:inline">LIQUID DIAMONDS</span>
                                    <span class="block text-green-300 xl:inline">DEVICE</span>
                                </h1>
                                <p
                                    class="mt-3 text-base text-gray-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-light font-sans px-4 lg:px-0">
                                    Rooted in nature, refined for your perfect high.
                                </p>
                                <div class="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                                    <div class="rounded-md shadow">
                                        <a href="products.cfm">
                                            <button
                                                class="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-black bg-green-400 hover:bg-green-500 brand-font tracking-widest transform transition hover:scale-105">
                                                VIEW FLAVORS
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div
                    class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-white opacity-5 transform -skew-x-12 translate-x-16 pointer-events-none">
                </div>
            </div>

            <div class="py-16 bg-gray-900">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-base text-green-400 font-semibold tracking-wide uppercase brand-font">Why Green
                            Team?</h2>
                        <p class="mt-2 text-3xl sm:text-4xl leading-8 text-white brand-font">
                            PREMIUM QUALITY. UNMATCHED FLAVOR.
                        </p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div class="p-8 bg-gray-800 rounded-xl border border-gray-700">
                            <i class="fas fa-gem text-blue-400 text-5xl mb-4"></i>
                            <h3 class="text-2xl mb-2 brand-font">Liquid Diamonds</h3>
                            <p class="text-gray-400 font-sans">Purest extraction process for maximum potency.</p>
                        </div>
                        <div class="p-8 bg-gray-800 rounded-xl border border-gray-700">
                            <i class="fas fa-leaf text-green-400 text-5xl mb-4"></i>
                            <h3 class="text-2xl mb-2 brand-font">Top Shelf Strains</h3>
                            <p class="text-gray-400 font-sans">Curated selection of Indica, Sativa, and Hybrids.</p>
                        </div>
                        <div class="p-8 bg-gray-800 rounded-xl border border-gray-700">
                            <i class="fas fa-shield-alt text-yellow-400 text-5xl mb-4"></i>
                            <h3 class="text-2xl mb-2 brand-font">Authentic</h3>
                            <p class="text-gray-400 font-sans">Verify your product instantly with our secure system.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="apparel" class="hidden-section fade-in">
            <div class="bg-gray-100 py-16 min-h-screen">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-4xl sm:text-5xl text-gray-900 mb-4 brand-font">OFFICIAL APPAREL</h2>
                        <p class="text-lg sm:text-xl text-gray-600 font-medium font-sans">Rep the Green Team with our
                            premium merch.</p>
                    </div>
                    <div id="apparel-grid" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    </div>
                </div>
            </div>
        </div>

    </main>

    <cfinclude template="includes/footer.cfm"></cfinclude>