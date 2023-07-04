const Hero = () => {
  return (
    <div class="relative overflow-hidden bg-gray-100">
      <div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div class="sm:max-w-lg mx-auto">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Fuel Your Savings, Efficiently
            </h1>
            <p class="mt-4 text-xl text-gray-500">
              Sign in or register below to access the fuel quote form and
              receive accurate price estimates for your needs, right at your
              fingertips.
            </p>
          </div>
        </div>
        <div class="text-center">
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/login"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign In
            </a>
            <a
              href="/register"
              class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
