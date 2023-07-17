import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  // Selects the user info from the Redux store
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {userInfo ? (
        <div className="relative min-h-screen overflow-hidden bg-gray-50">
          <div className="pb-80 pt-40">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-24 lg:px-32">
              <div className="mx-auto">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Hello, {userInfo.username}
                </h1>
                <p className="mt-4 text-lg text-gray-500">
                  At Fuel Quote, we value our loyal customers and strive to
                  provide the best possible service and savings. As a returning
                  user, you'll enjoy a special benefit - a 2% discount on your
                  fuel purchases. It's our way of showing appreciation for your
                  continued trust in us.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  But that's not all. We also offer state-based discounts to
                  customers residing in certain states. If you're located in
                  Texas or Louisiana, you'll receive an additional 10% discount
                  on your fuel purchases. For customers in Washington or Oregon,
                  you'll enjoy an 8% discount. And if you're located in
                  California, Nevada, or Arizona, you'll receive a 5% discount.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  We believe in providing fair and competitive pricing and these
                  state-based discounts allow us to pass on the savings directly
                  to you. It's just one more reason to choose Fuel Quote for all
                  your fuel needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Hero;
