import { Link } from "react-router-dom";
import { ShoppingCart, UserPlus, LogIn, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import useLogout from "../hooks/useLogout";
import { useCart } from "../contexts/CartContext";

function Navbar() {
  const { auth } = useAuth();
  const { isLoading, Logout } = useLogout();
  const { cart } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-white items-center space-x-2 flex"
          >
            E-Commerce
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-yellow-400 transition duration-300
           ease-in-out"
            >
              Home
            </Link>

            {auth ? (
              <>
                <Link
                  to={"/cart"}
                  className="relative group text-gray-300 hover:text-yellow-400 transition duration-300 
							ease-in-out"
                >
                  <ShoppingCart
                    className="inline-block mr-1 group-hover:text-yellow-400"
                    size={20}
                  />
                  <span className="hidden sm:inline">Cart</span>
                  {cart.length > 0 && (
                    <span
                      className="absolute -top-2 -left-2 bg-yellow-500 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-yellow-400 transition duration-300 ease-in-out"
                    >
                      {cart.length}
                    </span>
                  )}
                </Link>
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out"
                  onClick={Logout}
                  disabled={isLoading}
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline ml-2">Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 
                          rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>

                <Link
                  to={"/login"}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
                          rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
