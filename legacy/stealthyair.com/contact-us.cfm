<cfinclude template="includes/header.cfm" />
<main class="wrapperd z-[1] relative w-full h-full">
    <section class="relative w-full h-full">
        <cfinclude template="includes/top-bar.cfm" />

        <div class="absolute top-0 w-full h-full -z-[1] bg-cover bg-center bg-no-repeat h-screen"
            style="background-image: url('/assets/images/VerifyPat.svg')">
        </div>

        <div class="relative w-full px-5 sm:px-10 py-10 2xl:h-[calc(100vh-180px)]">
            <div class="w-full flexy relative pt-10">
                <div class="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-8 w-full h-full">
                    <!-- <div class="were relative w-full h-full contactPat">
                        <div class="justCenter flex-col space-y-7 lg:pt-10">
                            <div class="itemStart flex-col space-y-1 text-5xl lg:text-7xl">
                                <h1 class="font-medium">We're Here</h1>
                                <h1 class="font-medium">to Help</h1>
                            </div>
                            <div class="flex lg:w-10/12">
                                <p>
                                    At Stealthy, customer satisfaction is our top priority.
                                    Whether you have a question about our products, need
                                    assistance with your order, or simply want to share your
                                    feedback, we're here to help. Our dedicated team is ready
                                    to provide you with the support and information you need
                                    to have the best possible experience with our products and
                                    services.
                                </p>
                            </div>
                        </div>
                    </div> -->

                    <!-- <div class="contactForm relative w-full h-full">
                        <form class="grid grid-cols-12 w-full gap-5" id="forminfo" method="POST">
                            <div class="col-span-12 md:col-span-6 itemStart flex-col w-full space-y-2">
                                <label class="text-xl font-medium">Full Name <span
                                        class="text-gray-600">(Required)</span></label>
                                <input type="text" name="name" id="name"
                                    class="px-4 py-2 w-full rounded-lg border border-black" />
                            </div>
                            <div class="col-span-12 md:col-span-6 itemStart flex-col w-full space-y-2">
                                <label class="text-xl font-medium">Email <span
                                        class="text-gray-600">(Required)</span></label>
                                <input type="email" name="email" id="email"
                                    class="px-4 py-2 w-full rounded-lg border border-black" />
                            </div>
                            <div class="col-span-12 md:col-span-6 itemStart flex-col w-full space-y-2">
                                <label class="text-xl font-medium">Phone <span
                                        class="text-gray-600">(Optional)</span></label>
                                <input type="tel" name="phone" id="phone"
                                    class="px-4 py-2 w-full rounded-lg border border-black" />
                            </div>
                            <div class="col-span-12 md:col-span-6 itemStart flex-col w-full space-y-2">
                                <label class="text-xl font-medium">Company <span
                                        class="text-gray-600">(Optional)</span></label>
                                <input type="text" name="company" id="company"
                                    class="px-4 py-2 w-full rounded-lg border border-black" />
                            </div>
                            <div class="col-span-12 itemStart flex-col w-full space-y-2">
                                <label class="text-xl font-medium">Message <span
                                        class="text-gray-600">(Required)</span></label>
                                <textarea rows="5" name="comments" id="comment"
                                    class="px-4 py-2 w-full rounded-lg border border-black"></textarea>
                            </div>
                            <div class="col-span-8 itemStart flex-col w-full space-y-2">
                                <button type="submit"
                                    class="font-medium text-lg py-2.5 px-6 bg-black rounded-full text-white cursor-pointer">
                                    Send Message
                                </button>
                                <div id="thankYouMessage" style="display: none;">
                                    <p style="color: red;">Thank you. We will contact you soon.</p>
                                </div>
                            </div>

                        </form>
                    </div> -->
                </div>
            </div>
        </div>
    </section>
    <cfinclude template="includes/bottom-bar.cfm" />
</main>
<cfinclude template="includes/footer.cfm" />
<script>
    $(document).ready(function () {
        // Remove error message when user types in the input fields
        $('#name, #email, #phone, #company, #comment').on('input', function () {
            var field = $(this);
            field.next('.error').remove();  // Remove the error message next to the field
        });

        $('#forminfo').submit(function (event) {
            event.preventDefault();

            // Clear previous error messages
            $('.error').remove();

            // Get form data
            var formData = $(this).serialize();

            // Validation logic
            var isValid = true;

            // Validate Full Name
            if ($('#name').val().trim() === '') {
                $('#name').after('<span class="error text-red-500">Full Name is required</span>');
                isValid = false;
            }

            // Validate Email
            var email = $('#email').val().trim();
            var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (email === '' || !emailRegex.test(email)) {
                $('#email').after('<span class="error text-red-500">Please enter a valid email address</span>');
                isValid = false;
            }

            // Validate Phone
            // var phone = $('#phone').val().trim();
            // var phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
            // if (phone === '' || !phoneRegex.test(phone)) {
            //     $('#phone').after('<span class="error text-red-500">Please enter a valid phone number</span>');
            //     isValid = false;
            // }

            // Validate Company
            // if ($('#company').val().trim() === '') {
            //     $('#company').after('<span class="error text-red-500">Company is required</span>');
            //     isValid = false;
            // }

            // Validate Message
            if ($('#comment').val().trim() === '') {
                $('#comment').after('<span class="error text-red-500">Message is required</span>');
                isValid = false;
            }

            // If all fields are valid, submit the form
            if (isValid) {
                $.ajax({
                    type: 'POST',
                    url: 'save-contact.cfm?method=contactdata',
                    data: formData,
                    success: function (response) {
                        console.log("Form submitted successfully");
                        $("#forminfo")[0].reset();  // Reset the form fields

                        // Show the Thank You message next to the submit button
                        $("#thankYouMessage").fadeIn().css("display", "inline-block");

                        // Hide the message after 3 seconds
                        setTimeout(function () {
                            $("#thankYouMessage").fadeOut();
                        }, 3000);
                    },
                    error: function (error) {
                        console.error("Error submitting the form", error);
                    },
                });
            }
        });
    });

</script>