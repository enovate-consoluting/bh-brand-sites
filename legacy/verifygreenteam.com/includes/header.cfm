<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Green Team</title>

    <link rel="icon"
        href="https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/7d8bfb0e-69e7-4330-780a-6a2504ef8b00/public">
    <link rel="apple-touch-icon"
        href="https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/7d8bfb0e-69e7-4330-780a-6a2504ef8b00/public">

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./assets/css/style.css">
</head>

<body class="text-white min-h-screen flex flex-col font-sans">

    <div id="age-gate"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md hidden">
        <div
            class="bg-gray-900 border border-green-500/30 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center mx-4 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
            <img src="https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/7d8bfb0e-69e7-4330-780a-6a2504ef8b00/public"
                alt="Green Team" class="h-16 mx-auto mb-6">
            <h2 class="text-3xl brand-font text-white mb-2 tracking-wide">AGE VERIFICATION</h2>
            <p class="text-gray-300 mb-8 font-sans text-lg leading-relaxed">
                You Must be at Least 21+ to Enter.<br>
                <span class="text-green-400 font-bold">Are you at least 21?</span>
            </p>
            <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center font-sans">
                <button id="age-yes"
                    class="bg-green-600 hover:bg-green-500 text-black px-8 py-3 rounded-md font-bold transition w-full tracking-widest text-lg shadow-lg shadow-green-900/50">YES</button>
                <button id="age-no"
                    class="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-md font-bold transition w-full tracking-widest text-lg border border-gray-600">NO</button>
            </div>
            <p class="mt-6 text-xs text-gray-500 font-sans">By clicking "Yes", you agree to our Terms of Service and
                Privacy Policy.</p>
        </div>
    </div>

    <div id="product-modal"
        class="fixed inset-0 z-[60] hidden flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-opacity duration-300">
        <div
            class="relative bg-white rounded-2xl max-w-2xl w-full p-2 shadow-2xl transform transition-all scale-100 overflow-hidden flex flex-col">
            <button onclick="closeProductModal()"
                class="absolute top-4 right-4 z-20 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition shadow-sm">
                <i class="fas fa-times text-xl"></i>
            </button>

            <div class="flex flex-col md:flex-row h-full">
                <div class="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-4 rounded-xl relative">
                    <div id="modal-glow" class="absolute w-32 h-32 rounded-full blur-3xl opacity-50"></div>
                    <img id="modal-img" src="" alt="Product Image"
                        class="relative z-10 w-auto h-80 md:h-auto md:max-h-full object-contain drop-shadow-2xl hover:scale-105 transition duration-500 rounded-2xl">
                </div>

                <div class="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center text-center md:text-left">
                    <h3 id="modal-title"
                        class="text-2xl md:text-4xl text-gray-900 brand-font uppercase mb-2 md:mb-6 leading-none"></h3>

                    <div class="mb-4 md:mb-8">
                        <span id="modal-type"
                            class="px-4 py-1 rounded-full text-white text-sm font-bold uppercase shadow-md inline-block"></span>
                    </div>

                    <div id="modal-effects" class="flex flex-wrap gap-2 mb-2 justify-center md:justify-start"></div>

                    <p id="modal-desc" class="text-gray-600 font-sans text-sm mb-8 leading-relaxed hidden md:block"></p>

                    <div
                        class="flex space-x-8 justify-center md:justify-start mt-2 items-center border-t border-gray-200 pt-4 md:pt-6">
                        <a href="https://www.instagram.com/greenteam__apl?igsh=NTc4MTIwNjQ2YQ==" target="_blank"
                            class="text-gray-400 hover:text-pink-600 transition transform hover:scale-110">
                            <i class="fab fa-instagram fa-3x"></i>
                        </a>
                        <a href="https://t.me/+anwPCyGcoGhkNjVh" target="_blank"
                            class="text-gray-400 hover:text-blue-500 transition transform hover:scale-110">
                            <i class="fab fa-telegram fa-3x"></i>
                        </a>
                        <a href="https://dympt.org/greenteamorganics" target="_blank"
                            class="text-gray-400 hover:text-yellow-600 transition transform hover:scale-110">
                            <i class="fas fa-comment-dots fa-3x"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="verification-modal"
        class="fixed inset-0 z-[70] hidden flex items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-opacity duration-300">
        <div id="verification-box"
            class="relative bg-gray-900 rounded-2xl max-w-md w-full p-8 shadow-2xl transform transition-all scale-100 flex flex-col items-center text-center border-2">

            <img src="https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/7d8bfb0e-69e7-4330-780a-6a2504ef8b00/public"
                alt="Green Team" class="h-16 mb-6">

            <div id="verification-icon" class="mb-4 text-6xl"></div>

            <h3 id="verification-title" class="text-2xl brand-font text-white mb-2 uppercase tracking-wide"></h3>
            <p id="verification-message" class="text-gray-300 font-sans text-sm mb-8 leading-relaxed"></p>

            <div id="verification-buttons" class="w-full flex flex-col gap-3">
            </div>
        </div>
    </div>

    <nav class="bg-black sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-20">
                <div
                    class="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none md:flex-shrink-0 cursor-pointer z-10">
                    <div class="flex items-center">
                        <a href="index.cfm">
                            <img src="https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/7d8bfb0e-69e7-4330-780a-6a2504ef8b00/public"
                                alt="Green Team Logo" class="h-12 md:h-16 w-auto hover:opacity-80 transition rounded">
                        </a>
                    </div>
                </div>

                <div class="hidden md:block ml-auto">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="index.cfm">
                            <button
                                class="hover:bg-gray-800 px-3 py-2 rounded-md text-lg font-medium transition brand-font tracking-widest">Home</button>
                        </a>
                        <a href="products.cfm">
                            <button
                                class="hover:bg-gray-800 px-3 py-2 rounded-md text-lg font-medium transition brand-font tracking-widest">Products</button>
                        </a>
                        <button onclick="showPage('apparel')"
                            class="hidden hover:bg-gray-800 px-3 py-2 rounded-md text-lg font-medium transition brand-font tracking-widest">Apparel</button>
                        <a href="media.cfm">
                            <button
                                class="hover:bg-gray-800 px-3 py-2 rounded-md text-lg font-medium transition brand-font tracking-widest">Media</button>
                        </a>
                        <a href="verify.cfm">
                            <button
                                class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-lg font-medium transition shadow-lg border border-green-400 brand-font tracking-widest">Verify</button>
                        </a>
                    </div>
                </div>

                <div class="absolute right-0 flex md:hidden">
                    <button type="button" id="mobile-menu-btn"
                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span class="sr-only">Open main menu</span>
                        <i class="fas fa-bars text-2xl" id="menu-icon-open"></i>
                        <i class="fas fa-times text-2xl hidden" id="menu-icon-close"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="md:hidden hidden bg-black border-t border-gray-800" id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="index.cfm">
                    <button
                        class="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-4 rounded-md text-xl font-medium brand-font tracking-wider">HOME</button>
                </a>
                <a href="products.cfm">
                    <button
                        class="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-4 rounded-md text-xl font-medium brand-font tracking-wider">PRODUCTS</button>
                </a>
                <button onclick="showPage('apparel')"
                    class="hidden text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-4 rounded-md text-xl font-medium brand-font tracking-wider">APPAREL</button>
                <a href="media.cfm">
                    <button
                        class="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-4 rounded-md text-xl font-medium brand-font tracking-wider">MEDIA</button>
                </a>
                <a href="verify.cfm">
                    <button
                        class="text-green-400 hover:bg-gray-700 hover:text-green-300 block w-full text-left px-3 py-4 rounded-md text-xl font-medium brand-font tracking-wider">VERIFY</button>
                </a>
            </div>
        </div>
    </nav>