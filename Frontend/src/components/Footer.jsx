import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white w-full px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Section - Brand Info */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="flex flex-col space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold cursor-pointer">
                <span className="text-yellow-500">ola</span>
                <span className="text-blue-500">doc</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Book appointments effortlessly with oladoc. Connect with top
                professionals, manage your schedule, and enjoy seamless
                booking—anytime, anywhere. Receive reminders, and manage
                healthcare visits all in one place.
              </p>
            </div>
          </div>

          {/* Spacer - Pushes right sections further right */}
          <div className="md:col-span-1"></div>

          {/* Center Section - Company Links */}
          <div className="md:col-span-3 lg:col-span-2 md:ml-4">
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">COMPANY</h3>
              <ul className="space-y-3">
                {["Home", "About", "Contact us", "Privacy Policy"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-blue-500 transition-colors text-sm sm:text-base"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Right Section - Contact Info */}
          <div className="md:col-span-3 lg:col-span-2 md:ml-2">
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                GET IN TOUCH
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">
                    +92-3114446561
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">
                    shahidameen1275@gmail.com
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 mt-12 pt-6">
          <p className="text-gray-500 text-xs sm:text-sm text-center">
            Copyright © 2025 oladoc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
