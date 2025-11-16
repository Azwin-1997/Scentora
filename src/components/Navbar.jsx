import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";


function Navbar() {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const { cartCount } = useContext(CartContext);

  const handleToggleNav = () => setNavOpen(!navOpen);

  const getlogin = () => {
    navigate("/login");
  };

  const logoutUser = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    window.location.reload(); // refresh navbar state
  };

  return (
    <nav className="bg-gray-800 shadow-lg px-6 py-4 sticky top-0 z-50 rounded-b-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-yellow-400 font-bold text-xl">
            🧴
          </div>
          <span className="text-xl font-extrabold text-white">Scentora</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center space-x-4">

          {/* Login / Welcome */}
          {loggedInUser ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-yellow-400 font-semibold">
                Welcome, {loggedInUser.name}
              </span>

              <button
                onClick={logoutUser}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition duration-150"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={getlogin}
              className="hidden md:block bg-yellow-400 text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-500 transition duration-150"
            >
              Login
            </button>
          )}

          {/* Wishlist */}
          <a
            href="#"
            className="text-white hover:text-yellow-400 text-sm font-medium p-2 rounded-md transition duration-150 hidden sm:block"
          >
            Wishlist
          </a>

          {/* CART WITH COUNT */}
          <Link
            to="/cart"
            className="text-white hover:text-yellow-400 text-sm font-medium p-2 rounded-md relative transition duration-150 flex items-center"
          >
            Cart
            <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {cartCount}
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={handleToggleNav}
            className="md:hidden text-white hover:text-gray-400 p-2 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md"
          >
            {navOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden ${
          navOpen ? "block" : "hidden"
        } mt-2 border-t border-gray-700 pt-2`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">

          <a
            href="#"
            className="w-full block text-left text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
          >
            Wishlist
          </a>

          {loggedInUser ? (
            <div className="px-3 py-2 text-yellow-400 font-semibold">
              Welcome, {loggedInUser.name}
            </div>
          ) : (
            <button
              onClick={getlogin}
              className="w-full bg-yellow-400 text-gray-900 px-4 py-2 rounded-md text-base font-medium hover:bg-yellow-500 transition duration-150"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
