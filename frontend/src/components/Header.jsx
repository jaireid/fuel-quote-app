import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation hook
  const navigate = useNavigate("");
  // Redux dispatch function hook
  const dispatch = useDispatch("");

  const [logoutApiCall] = useLogoutMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <span className="flex items-center self-center text-2xl text-blue-600 font-semibold whitespace-nowrap">
            Fuel Quote
          </span>
        </Link>

        {userInfo ? (
          <>
            <div className="flex md:order-2">
              <button
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-md text-sm px-4 py-2 text-center mr-3"
                onClick={logoutHandler}
              >
                Sign Out <span aria-hidden="true">&rarr;</span>
              </button>
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-sticky"
                aria-expanded={isMenuOpen ? "true" : "false"}
                onClick={toggleMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className={`items-center justify-between w-full lg:mr-4 md:flex md:w-auto md:order-1 ${
                isMenuOpen ? "block" : "hidden"
              }`}
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                <li>
                  <Link
                    to="/quote"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-600 md:p-0"
                    aria-current="page"
                  >
                    Quote Form
                  </Link>
                </li>
                <li>
                  <Link
                    to="/history"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-600 md:p-0"
                  >
                    Quote History
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-600 md:p-0"
                  >
                    User Profile
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="contact"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-600 md:p-0"
                  >
                    Contact
                  </Link>
                </li> */}
              </ul>
            </div>
          </>
        ) : (
          <Link to="/login">
            <button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-md text-sm px-4 py-2 text-center mr-3">
              Sign In <span aria-hidden="true">&rarr;</span>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
