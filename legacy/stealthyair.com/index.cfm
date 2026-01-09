<cfinclude template="includes/header.cfm" />
<main class="wrapperd z-[1] relative w-full h-full">

  <section class="relative w-full overflow-hidden">
    <cfinclude template="includes/top-bar.cfm" />

    <div class="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
      style="background-image:url('/assets/images/hero.svg');">
    </div>

    <div class="w-full bg-black">
      <div class="video-container video-container-custom">
        <iframe id="heroVideo"
          src="https://customer-19w1a8y0iapg9msz.cloudflarestream.com/22e890afd808c258d7451fc77caea479/iframe?muted=true&loop=true&autoplay=true&controls=true"
          loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Hero Video">
        </iframe>
      </div>
    </div>

  </section>



  <section class="relative w-full pt-16">
    <div class="relative w-full lg:flex lg:flex-col lg:flex-row lg:justify-between">
      <div class="pb-10 px-5 sm:px-10 lg:px-20 w-full lg:w-1/2 space-y-10">
        <div class="space-y-10">
          <div class="flex flex-col text-5xl lg:text-7xl space-y-2">
            <h1 class="font-medium">Discretion</h1>
            <h1 class="font-medium w-1/2 sm:w-full">Meets Innovation</h1>
          </div>

          <div class="flex flex-col md:flex-row flex-wrap items-start text-2xl lg:text-4xl gap-2">
            <h2>Vaping Redefined.</h2>
            <h2>Experience Elevated.</h2>
          </div>

          <div class="lg:w-4/5">
            <p class="text-base lg:text-lg sm:pr-60 lg:pr-0">
              Stealthy Air is designed for those who want total discretion without sacrificing quality.
              Powered by advanced filtration technology and premium cannabis extracts, every draw is smooth, controlled,
              and
              engineered to eliminate all visible smoke through the built-in filter.
            </p>
          </div>

          <div class="flex flex-col md:flex-row flex-wrap items-start text-xl lg:text-2xl gap-2">
            <h4>You're welcome.</h4>
            <h4>Smoke away.</h4>
          </div>

        </div>

        <ul class="flex flex-col space-y-3">
          <li class="flex items-center gap-x-3">
            <div class="w-7 h-7 flex items-center justify-center text-xl p-2 rounded-full bg-black text-white">
              <i class="ri-check-fill"></i>
            </div>
            <span>Eco-Friendly</span>
          </li>
          <li class="flex items-center gap-x-3">
            <div class="w-7 h-7 flex items-center justify-center text-xl p-2 rounded-full bg-black text-white">
              <i class="ri-check-fill"></i>
            </div>
            <span>Ultra-Discreet</span>
          </li>
          <li class="flex items-center gap-x-3">
            <div class="w-7 h-7 flex items-center justify-center text-xl p-2 rounded-full bg-black text-white">
              <i class="ri-check-fill"></i>
            </div>
            <span>Patented Smokeless Technology</span>
          </li>
        </ul>
      </div>
      <div>
        <div class="flex flex-col justify-between py-10 px-5 sm:px-10 lg:px-20 w-full space-y-10 ml-auto slogo">
          <img src="assets/images/S Logo-2.png" alt="Logo"
            class="w-2/3 max-w-xs sm:max-w-md lg:max-w-4xl h-auto lg:w-[266px] ml-auto" />
        </div>
        <div class="lg:block max-w-4xl md:ml-auto mx-auto">
          <img src="assets/images/Bundle.png" class="md:ml-auto mx-auto" alt="" />
        </div>
      </div>
    </div>
  </section>

  <section class="relative w-full h-full prodSlid">
    <div class="absolute bottom-0 w-full h-full bg-center bg-no-repeat bg-cover"
      style="background-image: url('/assets/images/chooss.svg')"></div>

    <div class="relative flexy w-full h-full px-5 sm:px-10">
      <div class="w-full h-full flexy flex-col py-10 space-y-12">
        <div class="w-full flexy flex-col text-center mt-10 space-y-3">
          <div class="w-full flexy flex-col space-y-1 text-4xl lg:text-7xl">
            <h1 class="font-medium">Explore Our Flavors</h1>
            <!-- <h1 class="grifter">Strains</h1> -->
          </div>
          <!-- <p class="lg:w-2/5 font-medium">
                        At Stealthy, we know variety matters. Whether you prefer an
                        uplifting sativa, a relaxing indica, or a balanced hybrid, we've
                        got you covered.
                    </p> -->
        </div>

        <div class="relative w-full pb-6 px-4">
          <div class="sliderStealth">
            <div class="slicky w-full h-full mx-3">
              <div class="relative flex justify-center items-center w-full h-full group cursor-pointer">
                <div class="w-full h-full flex justify-center items-center relative">
                  <img src="assets/images/whitePat.svg" alt="Background Pattern" class="w-full h-full object-contain" />
                </div>
                <div class="absolute w-full h-full flex justify-center items-center p-4 z-30">
                  <img src="assets/images/Blueberry.png" alt="Blueberry" class="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <div class="slicky w-full h-full mx-3">
              <div class="relative flex justify-center items-center w-full h-full group cursor-pointer">
                <div class="w-full h-full flex justify-center items-center relative">
                  <img src="assets/images/whitePat.svg" alt="Background Pattern" class="w-full h-full object-contain" />
                </div>
                <div class="absolute w-full h-full flex justify-center items-center p-4 z-30">
                  <img src="assets/images/Jet_Fuel_OG.png" alt="Blueberry" class="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <div class="slicky w-full h-full mx-3">
              <div class="relative flex justify-center items-center w-full h-full group cursor-pointer">
                <div class="w-full h-full flex justify-center items-center relative">
                  <img src="assets/images/whitePat.svg" alt="Background Pattern" class="w-full h-full object-contain" />
                </div>
                <div class="absolute w-full h-full flex justify-center items-center p-4 z-30">
                  <img src="assets/images/Grandaddy.png" alt="Blueberry" class="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <div class="slicky w-full h-full mx-3">
              <div class="relative flex justify-center items-center w-full h-full group cursor-pointer">
                <div class="w-full h-full flex justify-center items-center relative">
                  <img src="assets/images/whitePat.svg" alt="Background Pattern" class="w-full h-full object-contain" />
                </div>
                <div class="absolute w-full h-full flex justify-center items-center p-4 z-30">
                  <img src="assets/images/Orange.png" alt="Blueberry" class="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <div class="slicky w-full h-full mx-3">
              <div class="relative flex justify-center items-center w-full h-full group cursor-pointer">
                <div class="w-full h-full flex justify-center items-center relative">
                  <img src="assets/images/whitePat.svg" alt="Background Pattern" class="w-full h-full object-contain" />
                </div>
                <div class="absolute w-full h-full flex justify-center items-center p-4 z-30">
                  <img src="assets/images/Peach_Ringz.png" alt="Blueberry" class="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <div class="slicky w-full h-full mx-3">
              <div class="relative flex justify-center items-center w-full h-full group cursor-pointer">
                <div class="w-full h-full flex justify-center items-center relative">
                  <img src="assets/images/whitePat.svg" alt="Background Pattern" class="w-full h-full object-contain" />
                </div>
                <div class="absolute w-full h-full flex justify-center items-center p-4 z-30">
                  <img src="assets/images/Pineapple_Express.png" alt="Blueberry" class="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <div class="slicky w-full h-full mx-3">
              <div class="relative flex justify-center items-center w-full h-full group cursor-pointer">
                <div class="w-full h-full flex justify-center items-center relative">
                  <img src="assets/images/whitePat.svg" alt="Background Pattern" class="w-full h-full object-contain" />
                </div>
                <div class="absolute w-full h-full flex justify-center items-center p-4 z-30">
                  <img src="assets/images/Rainbow_Cake.png" alt="Blueberry" class="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <div class="slicky w-full h-full mx-3">
              <div class="relative flex justify-center items-center w-full h-full group cursor-pointer">
                <div class="w-full h-full flex justify-center items-center relative">
                  <img src="assets/images/whitePat.svg" alt="Background Pattern" class="w-full h-full object-contain" />
                </div>
                <div class="absolute w-full h-full flex justify-center items-center p-4 z-30">
                  <img src="assets/images/Strawberry_Mango.png" alt="Blueberry" class="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <div class="slicky w-full h-full mx-3">
              <div class="relative flex justify-center items-center w-full h-full group cursor-pointer">
                <div class="w-full h-full flex justify-center items-center relative">
                  <img src="assets/images/whitePat.svg" alt="Background Pattern" class="w-full h-full object-contain" />
                </div>
                <div class="absolute w-full h-full flex justify-center items-center p-4 z-30">
                  <img src="assets/images/Tropical_Delight.png" alt="Blueberry" class="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <div class="slicky w-full h-full mx-3">
              <div class="relative flex justify-center items-center w-full h-full group cursor-pointer">
                <div class="w-full h-full flex justify-center items-center relative">
                  <img src="assets/images/whitePat.svg" alt="Background Pattern" class="w-full h-full object-contain" />
                </div>
                <div class="absolute w-full h-full flex justify-center items-center p-4 z-30">
                  <img src="assets/images/Wild_Cherry_Runtz.png" alt="Blueberry" class="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="relative w-full h-full advanced">
    <div class="absolute bottom-0 w-full h-full bg-center bg-no-repeat bg-cover"
      style="background-image: url('/assets/images/behindPat.svg')"></div>

    <div class="relative flexy w-full h-full px-5 sm:px-10">
      <div class="relative flexy flex-col w-full h-full pt-10 space-y-4">
        <div class="flexy flex-col text-center pt-10 pb-6 w-full space-y-3">
          <div class="flexy flex-col text-4xl lg:text-6xl space-y-1">
            <h1 class="font-medium">The Tech Behind</h1>
            <a href="index.cfm"><img src="assets/images/stealthyLogo.svg" alt="logo" class="w-46" />
            </a>
          </div>
          <p class="lg:w-[45%] font-medium">
            Stealthy is more than a sleek all-in-one vape-it's engineered with cutting-edge filtration technology that
            eliminates
            all visible smoke for maximum discretion. Delivering exceptional performance, rich flavor, and the freedom
            to enjoy it
            anywhere.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 pt-6 pb-10 gap-5 w-full h-full">
          <div class="relative w-full h-full flexy flex-col space-y-5 py-8">
            <div class="flexy w-full h-full relative gap-x-3">
              <div
                class="absolute hidden md:flex items-center justify-center -right-[2rem] top-[50%] bg-white/[0.45] w-7 h-7 rounded-full p-2">
              </div>
              <div class="relative border border-slate-300 bg-white/[0.45] rounded-xl w-full h-full !p-6">
                <div class="itemStart flex-col space-y-3 relative mt-12">
                  <div class="flex flex-col leading-none space-y-0 text-2xl">
                    <h3 class="font-medium">Advanced</h3>
                    <h3 class="font-medium">Ceramic Heating</h3>
                  </div>
                  <div class="flex flex-col space-y-0">
                    <p class="font-medium">
                      Heats evenly for rich, flavorful vapor
                    </p>
                    <p class="font-medium">No burnt taste, no overheating</p>
                  </div>
                </div>
                <div class="absolute right-3 top-3 w-[4.5rem] h-[4.5rem] flexy p-3 rounded-lg bg-black">
                  <img src="assets/images/heating.svg" class="img-fluid" alt="" />
                </div>
              </div>
            </div>

            <div class="flexy w-full h-full relative gap-x-3">
              <div
                class="absolute hidden md:flex items-center justify-center -right-[2rem] top-[50%] bg-white/[0.45] w-7 h-7 rounded-full p-2">
              </div>
              <div class="relative border border-slate-300 bg-white/[0.45] rounded-xl w-full h-full !p-6">
                <div class="itemStart flex-col space-y-3 relative mt-12">
                  <div class="flex flex-col leading-none space-y-0 text-2xl">
                    <h3 class="font-medium">Patented</h3>
                    <h3 class="font-medium">Smoke-Filtration Technology</h3>
                  </div>
                  <div class="flex flex-col space-y-0 font-medium">
                    <p>Exhale directly into integrated filter and</p>
                    <p>Eliminate all visible smoke.</p>
                  </div>
                </div>
                <div class="absolute right-3 top-3 w-[4.5rem] h-[4.5rem] flexy p-3 rounded-lg bg-black">
                  <img src="assets/images/airflow.svg" class="img-fluid" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div class="relative w-full h-full flexy">
            <div class="flexy relative w-full h-full">
              <img src="assets/images/oceanicPat.svg" class="img-fluid" alt="" />

              <div class="absolute w-full h-full flexy p-8">
                <img src="assets/images/tropical.png" class="img-fluid" alt="" />
              </div>
            </div>
          </div>

          <div class="relative w-full h-full flexy flex-col space-y-5 py-8">
            <div class="flexy w-full h-full relative gap-x-3">
              <div
                class="absolute hidden md:flex items-center justify-center -left-[2rem] top-[50%] bg-white/[0.45] w-7 h-7 rounded-full p-2">
              </div>
              <div class="relative border border-slate-300 bg-white/[0.45] rounded-xl w-full h-full !p-6">
                <div class="itemStart flex-col space-y-3 relative mt-12">
                  <div class="flex flex-col leading-none space-y-0 text-2xl">
                    <h3 class="font-medium">Leak-Proof &</h3>
                    <h3 class="font-medium">Mess-Free Design</h3>
                  </div>
                  <div class="flex flex-col space-y-0 font-medium">
                    <p>No spills, no sticky residue</p>
                    <p>Perfect for travel & daily use</p>
                  </div>
                </div>
                <div class="absolute right-3 top-3 w-[4.5rem] h-[4.5rem] flexy p-3 rounded-lg bg-black">
                  <img src="assets/images/mess.svg" class="img-fluid" alt="" />
                </div>
              </div>
            </div>

            <div class="flexy w-full h-full relative gap-x-3">
              <div
                class="absolute hidden md:flex items-center justify-center -left-[2rem] top-[50%] bg-white/[0.45] w-7 h-7 rounded-full p-2">
              </div>
              <div class="relative border border-slate-300 bg-white/[0.45] rounded-xl w-full h-full !p-6">
                <div class="itemStart flex-col space-y-3 relative mt-12">
                  <div class="flex flex-col leading-none space-y-0 text-2xl">
                    <h3 class="font-medium">Smart Battery</h3>
                    <h3 class="font-medium">System</h3>
                  </div>
                  <div class="flex flex-col space-y-0 font-medium">
                    <p>Long-lasting power for all-day vaping</p>
                    <p>USB-C fast charging for convenience</p>
                  </div>
                </div>
                <div class="absolute right-3 top-3 w-[4.5rem] h-[4.5rem] flexy p-3 rounded-lg bg-black">
                  <img src="assets/images/battery.svg" class="img-fluid" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- <section class="relative w-full h-full formSect">
    <div class="relative flexy w-full h-full">
      <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="relative w-full h-full sm:pt-10 pt-0 contactPat z-10">
          <div class="absolute -z-[1] w-full h-full bg-center bg-cover bg-no-repeat"
            style="background-image: url('/assets/images/hereHelp.svg')"></div>
          <div class="justCenter lg:pt-10 flex-col px-5 sm:pl-10 space-y-5">
            <div class="itemStart flex-col space-y-1 text-5xl lg:text-6xl">
              <h1 class="font-medium">We're</h1>
              <h1 class="font-medium">Here</h1>
              <h1 class="font-medium">to Help</h1>
            </div>
            <div class="flex lg:w-10/12 font-medium">
              <p>
                At Stealthy, customer satisfaction is our top priority. Whether
                you have a question about our products, need assistance with
                your order, or simply want to share your feedback, we're here to
                help. Our dedicated team is ready to provide you with the
                support and information you need to have the best possible
                experience with our products and services.
              </p>
            </div>
          </div>
        </div>

        <div class="relative w-full h-full sm:py-10 pt-0">
          <form class="grid grid-cols-12 w-full gap-5 pt-10 pb-5 px-5 sm:pr-10">
            <div class="col-span-12 md:col-span-6 itemStart flex-col w-full space-y-2">
              <label class="text-xl font-medium">Full Name <span class="text-gray-600">(Required)</span></label>
              <input type="text" class="px-4 py-2 w-full rounded-lg border border-black" />
            </div>
            <div class="col-span-12 md:col-span-6 itemStart flex-col w-full space-y-2">
              <label class="text-xl font-medium">Email <span class="text-gray-600">(Required)</span></label>
              <input type="email" class="px-4 py-2 w-full rounded-lg border border-black" />
            </div>
            <div class="col-span-12 md:col-span-6 itemStart flex-col w-full space-y-2">
              <label class="text-xl font-medium">Phone <span class="text-gray-600">(Optional)</span></label>
              <input type="tel" class="px-4 py-2 w-full rounded-lg border border-black" />
            </div>
            <div class="col-span-12 md:col-span-6 itemStart flex-col w-full space-y-2">
              <label class="text-xl font-medium">Company <span class="text-gray-600">(Optional)</span></label>
              <input type="text" class="px-4 py-2 w-full rounded-lg border border-black" />
            </div>
            <div class="col-span-12 itemStart flex-col w-full space-y-2">
              <label class="text-xl font-medium">Message <span class="text-gray-600">(Required)</span> </label>
              <textarea rows="5" class="px-4 py-2 w-full rounded-lg border border-black"></textarea>
            </div>
            <div class="col-span-8 itemStart flex-col w-full space-y-2 font-medium">
              <button type="submit"
                class="font-medium text-lg py-2.5 px-6 bg-black rounded-full text-white cursor-pointer">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section> -->

  <!-- <section class="newsLetSec z-[5] relative w-full h-full bg-[#D6D0D0]">
    <div class="absolute -z-[1] w-full h-full bg-center bg-cover bg-no-repeat"
      style="background-image: url('/assets/images/nlPat.svg')"></div>

    <div class="flexy w-full h-full py-10 px-5 sm:px-10">
      <div class="flexy flex-col py-10 space-y-4">
        <div class="flexy flex-col text-center space-y-0">
          <h1 class="text-5xl lg:text-7xl font-medium uppercase">Join Our</h1>
          <h1 class="text-5xl lg:text-7xl font-medium uppercase">NewsLetter</h1>

          <p class="text-center mt-1 font-medium">
            Sign up for deals, new products and promotions
          </p>
        </div>

        <div class="group w-full md:max-w-sm lg:max-w-2xl font-medium">
          <div class="relative flex items-center">
            <input type="text" placeholder=""
              class="peer relative w-full rounded-md bg-gray-50 py-3 pl-4 pr-8 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg" />
            <button
              class="absolute right-0 py-3 px-6 rounded-r-md bg-black font-semibold text-white transition-all duration-200 ease-in-out group-focus-within:bg-black group-focus-within:hover:bg-black cursor-pointer">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </section> -->
  <cfinclude template="includes/bottom-bar.cfm" />
</main>
<cfinclude template="includes/footer.cfm" />

<style>
  div#staticBackdrop {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #060606a1;
    height: 100%;
    width: 100%;
    z-index: 9;
  }

  div#staticBackdrop .modal-content {
    width: 300px;
    background: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  div#staticBackdrop .modal-content {
    width: 500px;
    background: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    filter: drop-shadow(0px 1px 15px #232020);
    border-radius: 37px;
    min-height: 355px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
  }

  h1.WelComeHead {
    font-size: 50px;
    font-weight: 700;
    line-height: 75px;
    letter-spacing: 0em;
    text-align: center;
    color: #000;
    padding-top: 20px;
  }

  .my-4.innertext h5 {
    font-size: 22px;
    font-weight: 700;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: center;
    color: #000;
    margin-bottom: 40px;
  }

  .btn-common {
    background-color: #000 !important;
    border-color: #000 !important;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: fit-content;
    min-width: 100px;
    padding: 8px 20px;
    border: 1px solid var(--clr-dark);
    background: var(--clr-dark);
    position: relative;
    font-size: 16px;
    font-family: "Poppins", sans-serif;
    text-transform: uppercase;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.02em;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    color: #fff;
    border-radius: 7px;
  }

  button#btn-beta {
    padding: 8px 20px;
    border-radius: 0;
    color: var(--clr-dark);
    position: relative;
    min-width: 100px;
    background: transparent;
    border: 1px solid #020202;
    font-size: 16px;
    font-family: "Poppins", sans-serif;
    text-transform: uppercase;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.02em;
    transition: all 0.3s ease-in-out;
    border-radius: 7px;
  }

  div#staticBackdrop button {
    margin: 0 8px;
    cursor: pointer;
  }

  h1.WelComeHead {
    font-size: 50px;
    font-weight: 700;
    line-height: 75px;
    letter-spacing: 0em;
    text-align: center;
    color: #000;
    padding-top: 0;
  }

  button#btn-beta:hover {
    background: #000000;
    border-color: #000000;
    color: #fff;
  }

  .mainp#staticBackdrop {
    display: none;
  }

  @media (max-width: 567px) {
    div#staticBackdrop .modal-content {
      width: 95% !important;
    }
  }

  div#staticBackdrop .btn-common:hover {
    background: #333;
  }
</style>