import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div
      className="flex flex-col md:flex-row rounded-lg px-6 md:px-10 lg:px-10 mt-5 overflow-hidden"
      style={{
        background:
          "linear-gradient(103deg, rgb(231, 169, 83),rgb(115, 152, 206) 98.58%)",
      }}
    >
      {/* ---Left Section ----- */}
      <div className="md:w-1/2 flex flex-col justify-center items-start gap-4 py-10 md:py-[10vw]">
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight md:leading-tight lg:leading-tight">
          Book Your <br />
          Doctor Appointment Online
        </p>
        <div className="text-white flex flex-col md:flex-row items-center gap-3 text-sm font-light">
          <img
            className="w-30"
            src={assets.group_profiles}
            alt="Patient profiles"
          />
          <p className="mt-2">
            Simply browse through our extensive list of doctors{" "}
            <br className="hidden sm:block" />
            and book an appointment with the doctor of your choice.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white font-medium px-9 py-4 text-gray-600 rounded-full text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book appointment{" "}
          <img className="w-3" src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>

      {/* ----Right section---- */}
      <div className="md:w-1/2 flex justify-center md:justify-end">
        <img
          className="w-full max-w-md md:max-w-none h-auto object-contain"
          src={assets.header_img}
          alt="Doctor illustration"
        />
      </div>
    </div>
  );
};

export default Header;
