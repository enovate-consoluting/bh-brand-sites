<cfinclude template="includes/header.cfm">

    <div id="products" class="fade-in">
        <div class="py-16 relative z-10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-4xl sm:text-5xl text-gray-900 mb-4 brand-font">FLAVOR COLLECTION</h2>
                    <p class="text-lg sm:text-xl text-gray-600 font-medium font-sans">Discover our lineup of
                        Indicas, Sativas, and Hybrids.</p>
                </div>

                <div class="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 font-sans">
                    <button onclick="filterProducts('all')"
                        class="bg-white text-black px-8 py-2 rounded-full font-bold hover:bg-gray-200 transition shadow-sm border border-gray-200 min-w-[120px] text-center">ALL</button>

                    <div class="flex gap-3 flex-wrap justify-center">
                        <button onclick="filterProducts('Indica')"
                            class="bg-purple-600 text-white px-6 py-2 rounded-full font-bold hover:bg-purple-700 transition shadow-sm">INDICA</button>
                        <button onclick="filterProducts('Sativa')"
                            class="bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600 transition shadow-sm">SATIVA</button>
                        <button onclick="filterProducts('Hybrid')"
                            class="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition shadow-sm">HYBRID</button>
                    </div>
                </div>

                <div id="product-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                </div>
            </div>
        </div>
    </div>

    <cfinclude template="includes/footer.cfm"></cfinclude>