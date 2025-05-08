// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { assets } from "../assets/assets";

// const SideBar = () => {
//   const { atoken } = useSelector((state) => state.admin);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <>
//       {/* Hamburger Menu Button for Mobile */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         onClick={toggleMobileMenu}
//         aria-label="Toggle menu"
//       >
//         <svg
//           className="w-6 h-6 text-gray-700"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d={
//               isMobileMenuOpen
//                 ? "M6 18L18 6M6 6l12 12"
//                 : "M4 6h16M4 12h16M4 18h16"
//             }
//           />
//         </svg>
//       </button>

//       {/* Mobile Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform ${
//           isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//         } md:hidden transition-transform duration-300 ease-in-out z-40`}
//       >
//         <div className="flex-1 px-3 py-4 space-y-1 mt-16">
//           {atoken && (
//             <nav className="space-y-1.5">
//               <NavLink
//                 to="/admin-dashboard"
//                 className={({ isActive }) =>
//                   `group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
//                     isActive
//                       ? "bg-blue-50 text-blue-700 shadow-sm"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
//                   }`
//                 }
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <img
//                   src={assets.home_icon}
//                   alt="home"
//                   className="w-5 h-5 group-hover:scale-110 transition-transform"
//                 />
//                 <span>Dashboard</span>
//               </NavLink>

//               <NavLink
//                 to="/all-appointments"
//                 className={({ isActive }) =>
//                   `group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
//                     isActive
//                       ? "bg-blue-50 text-blue-700 shadow-sm"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
//                   }`
//                 }
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <img
//                   src={assets.appointment_icon}
//                   alt="appointments"
//                   className="w-5 h-5 group-hover:scale-110 transition-transform"
//                 />
//                 <span>Appointments</span>
//               </NavLink>

//               <NavLink
//                 to="/add-doctor"
//                 className={({ isActive }) =>
//                   `group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
//                     isActive
//                       ? "bg-blue-50 text-blue-700 shadow-sm"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
//                   }`
//                 }
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <img
//                   src={assets.add_icon}
//                   alt="add doctor"
//                   className="w-5 h-5 group-hover:scale-110 transition-transform"
//                 />
//                 <span>Add Doctors</span>
//               </NavLink>

//               <NavLink
//                 to="/doctors-list"
//                 className={({ isActive }) =>
//                   `group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
//                     isActive
//                       ? "bg-blue-50 text-blue-700 shadow-sm"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
//                   }`
//                 }
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <img
//                   src={assets.people_icon}
//                   alt="doctors list"
//                   className="w-5 h-5 group-hover:scale-110 transition-transform"
//                 />
//                 <span>Doctors List</span>
//               </NavLink>
//             </nav>
//           )}
//         </div>
//       </aside>

//       {/* Desktop Sidebar */}
//       <aside
//         className={`hidden md:flex flex-col min-h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
//           isCollapsed ? "w-16" : "w-64"
//         }`}
//       >
//         <div className="flex-1 px-3 py-4 space-y-1">
//           {atoken && (
//             <nav className="space-y-1.5">
//               <NavLink
//                 to="/admin-dashboard"
//                 className={({ isActive }) =>
//                   `group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
//                     isActive
//                       ? "bg-blue-50 text-blue-700 shadow-sm"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
//                   }`
//                 }
//               >
//                 <img
//                   src={assets.home_icon}
//                   alt="home"
//                   className="w-5 h-5 group-hover:scale-110 transition-transform"
//                 />
//                 {!isCollapsed && <span>Dashboard</span>}
//               </NavLink>

//               <NavLink
//                 to="/all-appointments"
//                 className={({ isActive }) =>
//                   `group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
//                     isActive
//                       ? "bg-blue-50 text-blue-700 shadow-sm"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
//                   }`
//                 }
//               >
//                 <img
//                   src={assets.appointment_icon}
//                   alt="appointments"
//                   className="w-5 h-5 group-hover:scale-110 transition-transform"
//                 />
//                 {!isCollapsed && <span>Appointments</span>}
//               </NavLink>

//               <NavLink
//                 to="/add-doctor"
//                 className={({ isActive }) =>
//                   `group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
//                     isActive
//                       ? "bg-blue-50 text-blue-700 shadow-sm"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
//                   }`
//                 }
//               >
//                 <img
//                   src={assets.add_icon}
//                   alt="add doctor"
//                   className="w-5 h-5 group-hover:scale-110 transition-transform"
//                 />
//                 {!isCollapsed && <span>Add Doctors</span>}
//               </NavLink>

//               <NavLink
//                 to="/doctors-list"
//                 className={({ isActive }) =>
//                   `group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
//                     isActive
//                       ? "bg-blue-50 text-blue-700 shadow-sm"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
//                   }`
//                 }
//               >
//                 <img
//                   src={assets.people_icon}
//                   alt="doctors list"
//                   className="w-5 h-5 group-hover:scale-110 transition-transform"
//                 />
//                 {!isCollapsed && <span>Doctors List</span>}
//               </NavLink>
//             </nav>
//           )}
//         </div>

//         {/* Collapse/Expand Button */}
//         <button
//           className="p-3 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           onClick={toggleCollapse}
//           aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
//             />
//           </svg>
//         </button>
//       </aside>
//     </>
//   );
// };

// export default SideBar;
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const SideBar = () => {
  const { atoken } = useSelector((state) => state.admin);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Common NavLink styles
  const navLinkStyles = (isActive) =>
    `group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-700 shadow-sm"
        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
    }`;

  // Navigation items data
  const navItems = [
    { to: "/admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
    {
      to: "/all-appointments",
      icon: assets.appointment_icon,
      label: "Appointments",
    },
    { to: "/add-doctor", icon: assets.add_icon, label: "Add Doctors" },
    { to: "/doctors-list", icon: assets.people_icon, label: "Doctors List" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:bg-gray-50"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-gray-700 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={
              isMobileMenuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden transition-transform duration-300 ease-in-out z-40 shadow-xl`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 px-3 py-4 space-y-1 mt-16 overflow-y-auto">
            {atoken && (
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => navLinkStyles(isActive)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <img
                      src={item.icon}
                      alt={item.label.toLowerCase()}
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                    />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            )}
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col min-h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        } fixed`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {atoken && (
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => navLinkStyles(isActive)}
                  >
                    <img
                      src={item.icon}
                      alt={item.label.toLowerCase()}
                      className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                        isCollapsed ? "mx-auto" : ""
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="transition-opacity duration-200">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>
            )}
          </div>

          {/* Collapse/Expand Button */}
          <div className="p-3 border-t border-gray-100">
            <button
              className="w-full flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={toggleCollapse}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg
                className="w-5 h-5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
                />
              </svg>
              {!isCollapsed && (
                <span className="ml-2 text-sm font-medium">Collapse</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default SideBar;
