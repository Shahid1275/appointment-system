import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const SideBar = () => {
  const { atoken } = useSelector((state) => state.admin);
  const { dtoken } = useSelector((state) => state.doctor); // Use dtoken directly
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // console.log("SideBar: atoken:", atoken, "dtoken:", dtoken); // Debug logging

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Common NavLink styles
  const navLinkStyles = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-700 shadow-sm"
        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
    }`;

  // Admin navigation items
  const adminNavItems = [
    { to: "/admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
    {
      to: "/all-appointments",
      icon: assets.appointment_icon,
      label: "Appointments",
    },
    { to: "/add-doctor", icon: assets.add_icon, label: "Add Doctors" },
    { to: "/doctors-list", icon: assets.people_icon, label: "Doctors List" },
  ];

  // Doctor navigation items
  const doctorNavItems = [
    { to: "/doctor-dashboard", icon: assets.home_icon, label: "Dashboard" },
    {
      to: "/doctor-appointments",
      icon: assets.appointment_icon,
      label: "Appointments",
    },
    {
      to: "/doctor-profile",
      icon: assets.people_icon,
      label: "Profile",
    },
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
        className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40 shadow-xl ${
          isMobileMenuOpen ? "w-full translate-x-0" : "-translate-x-full w-0"
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 px-3 py-4 space-y-1 mt-16 overflow-y-auto">
            <nav className="space-y-2">
              {atoken &&
                adminNavItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={navLinkStyles}
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
              {dtoken &&
                doctorNavItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={navLinkStyles}
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
            <nav className="space-y-2">
              {atoken &&
                adminNavItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={navLinkStyles}>
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
              {dtoken &&
                doctorNavItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={navLinkStyles}>
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
    </>
  );
};

export default SideBar;
