// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { useSelector, useDispatch } from "react-redux";
// import { setToken } from "../redux/features/doctors/doctorSlice";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const { token, userData } = useSelector((state) => state.doctor.token);

//   const handleLogout = () => {
//     dispatch(setToken(null)); // Dispatch null to clear token in Redux
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="flex text-sm items-center justify-between py-4 sticky border-b top-0 bg-white z-50 px-4 md:px-8">
//       {/* Logo */}
//       <h2
//         onClick={() => navigate("/")}
//         className="text-4xl font-bold cursor-pointer"
//       >
//         <span className="text-yellow-500">ola</span>
//         <span className="text-blue-500">doc</span>
//       </h2>

//       {/* Desktop Menu */}
//       <ul className="hidden md:flex gap-8 items-center font-medium">
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `relative ${isActive ? "text-blue-500" : ""}`
//           }
//         >
//           {({ isActive }) => (
//             <>
//               <li className="hover:text-blue-500 transition-colors">HOME</li>
//               <hr
//                 className={`absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-300 ${
//                   isActive ? "opacity-100" : "opacity-0"
//                 }`}
//               />
//             </>
//           )}
//         </NavLink>

//         <NavLink
//           to="/doctors"
//           className={({ isActive }) =>
//             `relative ${isActive ? "text-blue-500" : ""}`
//           }
//         >
//           {({ isActive }) => (
//             <>
//               <li className="hover:text-blue-500 transition-colors">
//                 ALL DOCTORS
//               </li>
//               <hr
//                 className={`absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-300 ${
//                   isActive ? "opacity-100" : "opacity-0"
//                 }`}
//               />
//             </>
//           )}
//         </NavLink>

//         <NavLink
//           to="/about"
//           className={({ isActive }) =>
//             `relative ${isActive ? "text-blue-500" : ""}`
//           }
//         >
//           {({ isActive }) => (
//             <>
//               <li className="hover:text-blue-500 transition-colors">ABOUT</li>
//               <hr
//                 className={`absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-300 ${
//                   isActive ? "opacity-100" : "opacity-0"
//                 }`}
//               />
//             </>
//           )}
//         </NavLink>

//         <NavLink
//           to="/contact"
//           className={({ isActive }) =>
//             `relative ${isActive ? "text-blue-500" : ""}`
//           }
//         >
//           {({ isActive }) => (
//             <>
//               <li className="hover:text-blue-500 transition-colors">CONTACT</li>
//               <hr
//                 className={`absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-300 ${
//                   isActive ? "opacity-100" : "opacity-0"
//                 }`}
//               />
//             </>
//           )}
//         </NavLink>
//       </ul>

//       {/* Right Side: Profile pic + Hamburger */}
//       <div className="flex items-center gap-4">
//         {token && userData ? (
//           <div className="relative group cursor-pointer">
//             {/* Profile Image and Dropdown */}
//             <div className="flex items-center gap-2">
//               <img
//                 className="w-10 h-10 rounded-full object-cover"
//                 src={userData.image}
//                 alt="Profile"
//               />
//               <img
//                 className="w-2.5 transition-transform group-hover:rotate-180"
//                 src={assets.dropdown_icon}
//                 alt="Dropdown"
//               />
//             </div>

//             {/* Dropdown menu */}
//             <div className="absolute top-full right-0 bg-white shadow-lg rounded-md py-2 w-48 text-base font-medium text-gray-600 hidden group-hover:block z-20">
//               <div className="flex flex-col">
//                 <p
//                   onClick={() => {
//                     navigate("/my-profile");
//                     setShowMenu(false);
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100"
//                 >
//                   My Profile
//                 </p>
//                 <p
//                   onClick={() => {
//                     navigate("/myappointments");
//                     setShowMenu(false);
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100"
//                 >
//                   My Appointments
//                 </p>
//                 <p
//                   onClick={handleLogout}
//                   className="px-4 py-2 hover:bg-gray-100 text-red-500 hover:text-red-600"
//                 >
//                   Logout
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-full font-light hover:bg-blue-600 transition"
//           >
//             Create Account
//           </button>
//         )}

//         {/* Hamburger Icon (Mobile) */}
//         <img
//           onClick={() => setShowMenu(true)}
//           className="w-6 md:hidden cursor-pointer"
//           src={assets.menu_icon}
//           alt="Menu"
//         />
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 right-0 bottom-0 bg-white z-50 overflow-hidden transition-all ${
//           showMenu ? "w-full" : "w-0"
//         } md:hidden`}
//       >
//         <div className="flex items-center justify-between px-8 py-6">
//           <h2
//             onClick={() => {
//               setShowMenu(false);
//               navigate("/");
//             }}
//             className="text-4xl font-bold cursor-pointer"
//           >
//             <span className="text-yellow-500">ola</span>
//             <span className="text-blue-500">doc</span>
//           </h2>
//           <img
//             className="w-6 cursor-pointer"
//             onClick={() => setShowMenu(false)}
//             src={assets.cross_icon}
//             alt="Close Menu"
//           />
//         </div>

//         <ul className="flex flex-col items-center gap-6 mt-10 text-lg font-medium">
//           <NavLink to="/" onClick={() => setShowMenu(false)}>
//             <p className="rounded inline-block py-2">HOME</p>
//           </NavLink>
//           <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
//             <p className="rounded inline-block py-2">ALL DOCTORS</p>
//           </NavLink>
//           <NavLink to="/about" onClick={() => setShowMenu(false)}>
//             <p className="rounded inline-block py-2">ABOUT</p>
//           </NavLink>
//           <NavLink to="/contact" onClick={() => setShowMenu(false)}>
//             <p className="rounded inline-block py-2">CONTACT</p>
//           </NavLink>
//           {token ? (
//             <>
//               <NavLink to="/my-profile" onClick={() => setShowMenu(false)}>
//                 <p className="rounded inline-block py-2">MY PROFILE</p>
//               </NavLink>
//               <button
//                 onClick={handleLogout}
//                 className="text-red-500 hover:text-red-600 py-2"
//               >
//                 LOGOUT
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => {
//                 setShowMenu(false);
//                 navigate("/login");
//               }}
//               className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
//             >
//               LOGIN
//             </button>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../redux/features/doctors/doctorSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { token, userData, status } = useSelector((state) => state.doctor); // Fixed selector

  const handleLogout = () => {
    dispatch(setToken(null));
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex text-sm items-center justify-between py-4 sticky border-b top-0 bg-white z-50 px-4 md:px-8">
      {/* Logo */}
      <h2
        onClick={() => navigate("/")}
        className="text-4xl font-bold cursor-pointer"
      >
        <span className="text-yellow-500">ola</span>
        <span className="text-blue-500">doc</span>
      </h2>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 items-center font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative ${isActive ? "text-blue-500" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              <li className="hover:text-blue-500 transition-colors">HOME</li>
              <hr
                className={`absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          )}
        </NavLink>

        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            `relative ${isActive ? "text-blue-500" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              <li className="hover:text-blue-500 transition-colors">
                ALL DOCTORS
              </li>
              <hr
                className={`absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          )}
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `relative ${isActive ? "text-blue-500" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              <li className="hover:text-blue-500 transition-colors">ABOUT</li>
              <hr
                className={`absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          )}
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `relative ${isActive ? "text-blue-500" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              <li className="hover:text-blue-500 transition-colors">CONTACT</li>
              <hr
                className={`absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          )}
        </NavLink>
      </ul>

      {/* Right Side: Profile pic + Hamburger */}
      <div className="flex items-center gap-4">
        {token ? (
          status === "loading" ? (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          ) : userData ? (
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-2">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={userData.image}
                  alt="Profile"
                />
                <img
                  className="w-2.5 transition-transform group-hover:rotate-180"
                  src={assets.dropdown_icon}
                  alt="Dropdown"
                />
              </div>
              <div className="absolute top-full right-0 bg-white shadow-lg rounded-md py-2 w-48 text-base font-medium text-gray-600 hidden group-hover:block z-20">
                <div className="flex flex-col">
                  <p
                    onClick={() => {
                      navigate("/my-profile");
                      setShowMenu(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/myappointments");
                      setShowMenu(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-100 text-red-500 hover:text-red-600"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-red-500 text-sm">Error loading profile</div>
          )
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-full font-light hover:bg-blue-600 transition"
          >
            Create Account
          </button>
        )}

        {/* Hamburger Icon (Mobile) */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-white z-50 overflow-hidden transition-all ${
          showMenu ? "w-full" : "w-0"
        } md:hidden`}
      >
        <div className="flex items-center justify-between px-8 py-6">
          <h2
            onClick={() => {
              setShowMenu(false);
              navigate("/");
            }}
            className="text-4xl font-bold cursor-pointer"
          >
            <span className="text-yellow-500">ola</span>
            <span className="text-blue-500">doc</span>
          </h2>
          <img
            className="w-6 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="Close Menu"
          />
        </div>

        <ul className="flex flex-col items-center gap-6 mt-10 text-lg font-medium">
          <NavLink to="/" onClick={() => setShowMenu(false)}>
            <p className="rounded inline-block py-2">HOME</p>
          </NavLink>
          <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
            <p className="rounded inline-block py-2">ALL DOCTORS</p>
          </NavLink>
          <NavLink to="/about" onClick={() => setShowMenu(false)}>
            <p className="rounded inline-block py-2">ABOUT</p>
          </NavLink>
          <NavLink to="/contact" onClick={() => setShowMenu(false)}>
            <p className="rounded inline-block py-2">CONTACT</p>
          </NavLink>
          {token ? (
            <>
              <NavLink to="/my-profile" onClick={() => setShowMenu(false)}>
                <p className="rounded inline-block py-2">MY PROFILE</p>
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 py-2"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/login");
              }}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
            >
              LOGIN
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
