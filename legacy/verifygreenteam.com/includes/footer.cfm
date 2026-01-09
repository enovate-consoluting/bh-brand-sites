    <cfquery name="getClientInfo" datasource="#application.datasource#">
        SELECT 
            email_addr,
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
        FROM
            #application.schema#.client
        WHERE
            company_name = <cfqueryparam cfsqltype="cf_sql_varchar" value="#application.company_name#"> and
            large_logo is not null
    </cfquery>

    <footer class="bg-black py-8 border-t border-gray-800 snap-align-none">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="text-center w-full md:w-1/3 order-3 md:order-1">
                <p class="text-gray-500 text-xs md:text-right mt-1 font-sans">© 2025 Green Team. All rights reserved.</p>
            </div>
            <div class="flex sm:justify-start justify-center w-full md:w-1/3 order-1 md:order-2">
                 <img src="https://imagedelivery.net/ofaxELKSbhOGL0thW-m_ww/7d8bfb0e-69e7-4330-780a-6a2504ef8b00/public" alt="Green Team Logo" class="h-10 sm:h-12 w-auto opacity-80 hover:opacity-100 transition rounded">
            </div>
            <div class="flex space-x-6 justify-center w-full md:w-1/3 order-2 md:order-3">
                <cfif Len(getClientInfo.instagram) GT 0>
                    <a href="<cfoutput>#application.hostName#/redirect/?type=ig&url=https%3A%2F%2Fwww.instagram.com%2F#getClientInfo.instagram#&client=#EncodeForURL(getClientInfo.company_name)#</cfoutput>" target="_blank" class="text-gray-400 hover:text-white transition">
                        <i class="fab fa-instagram fa-2x"></i>
                    </a>
                </cfif>
                <a href="https://t.me/+anwPCyGcoGhkNjVh" target="_blank" class="text-gray-400 hover:text-white transition">
                    <i class="fab fa-telegram fa-2x"></i>
                </a>
                <a href="https://dympt.org/greenteamorganics" target="_blank" class="text-gray-400 hover:text-white transition">
                    <i class="fas fa-comment-dots fa-2x"></i>
                </a>
            </div>
        </div>
    </footer>

    <script src="./assets/js/main.js"></script>
</body>
</html>