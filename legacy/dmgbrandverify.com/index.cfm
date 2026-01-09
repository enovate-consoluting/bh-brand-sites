<cfparam name="getScanCount.cnt" default="0">

    <cfquery name="getClientInfo" datasource="#application.datasource#">
        SELECT
        `client`.`company_name`,
        `client`.`instagram`,
        `client`.`large_logo`,
        `client`.`client_id`
        FROM
        `#application.schema#`.`client`
        WHERE
        `client`.`company_name` = <cfqueryparam cfsqltype="cf_sql_varchar" value="#application.company_name#"> and
            `client`.`large_logo` is not null
    </cfquery>

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>DMG Hats</title>
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="fonts/stylesheet.css">
        <link rel="stylesheet" href="css/master.css">

        <style>

            /* .verification-wrapper {
                position: relative;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            } */
/* 
            .bg_image {
                position: absolute;
                inset: 0;
                z-index: 1;
            } */

            /* .bg_image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            } */

            .video-overlay {
                position: absolute;
                inset: 0;
                background: url('img/HEARTS.png') center / cover no-repeat;
                z-index: 2;
                pointer-events: none;
            }

            /* .verify-inputbox {
                z-index: 3;
                text-align: center;
            } */
        </style>
    </head>

    <body>

        <section class="verification-wrapper">

            <div class="video-background">
                <img src="img/BACKGROUND COLOR.png" alt="">
            </div>

            <div class="video-overlay"></div>

            <div class="verify-inputbox">
                <div class="verifyInfo">

                    <div class="verify-btn">
                        <img src="img/LOVERS ONLY TITLE.png" alt="">
                    </div>

                    <div class="IconBox">
                        <img src="img/Black Hat.png" alt="">
                    </div>

                    <div class="product-text">
                        <h4>Scan Counter: <span>00</span></h4>
                    </div>

                    <div class="imageicon">
                        <a href="" target="_blank">
                            <img src="img/authentic hat text.png" alt="">
                        </a>
                    </div>

                    <div class="cap_logo">
                        <img src="img/brand logo.png" alt="">
                    </div>

                </div>
            </div>

        </section>
        <script src="js/jquerymin.js"></script>
        <script src="js/bootstrap.js"></script>

    </body>

    </html>