import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50">
      <div className="pb-80 pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Fuel Your Savings, Efficiently
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Sign in or register below to access the fuel quote form and
              receive accurate price estimates for your needs, right at your
              fingertips.
            </p>
            <div className="text-center">
              <div className="mt-6 flex justify-left gap-x-6">
                <Link
                  to="/register"
                  className="bg-transparent hover:bg-blue-500 text-blue-600 font-semibold hover:text-white py-2 px-4 border border-blue-600 hover:border-transparent rounded"
                >
                  Register Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
