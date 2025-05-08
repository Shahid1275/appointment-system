import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/admin/adminSlice";

const Navbar = () => {
  const { atoken } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("atoken");
    // Dispatch logout action to clear Redux state
    dispatch(logout());
    // Navigate to login page immediately
    navigate("/login", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 pl-12 md:pl-0">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 cursor-pointer select-none">
              <span className="text-yellow-500">ola</span>
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                doc
              </span>
            </h2>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium ${
                atoken
                  ? "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20"
                  : "bg-blue-50 text-blue-700 ring-1 ring-blue-700/20"
              }`}
            >
              {atoken ? "Admin" : "Doctor"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded px-3 py-1 text-sm font-semibold text-red-600 hover:text-white hover:bg-red-600 ring-1 ring-red-200 transition-all duration-200 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
