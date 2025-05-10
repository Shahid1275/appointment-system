import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as adminLogout } from "../redux/features/admin/adminSlice";
import { logout as doctorLogout } from "../redux/features/doctors/doctorSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const { atoken } = useSelector((state) => state.admin);
  const { dtoken } = useSelector((state) => state.doctor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (atoken) {
      dispatch(adminLogout());
      toast.success("Admin logged out successfully");
    } else if (dtoken) {
      dispatch(doctorLogout());
      toast.success("Doctor logged out successfully");
    }
    navigate("/login", { replace: true });
  };

  const userRole = atoken ? "Admin" : dtoken ? "Doctor" : "Guest";

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
                  ? "bg-blue-50 text-blue-700 ring-1 ring-blue-700/20"
                  : dtoken
                  ? "bg-yellow-50 text-yellow-800 ring1 ring-yellow-600/20"
                  : "bg-gray-50 text-gray-600 ring-1 ring-gray-200"
              }`}
            >
              {userRole}
            </span>
          </div>

          {(atoken || dtoken) && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded px-3 py-1 text-sm font-semibold text-red-600 hover:text-white hover:bg-red-600 ring-1 ring-red-200 transition-all duration-200 ease-in-out"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
