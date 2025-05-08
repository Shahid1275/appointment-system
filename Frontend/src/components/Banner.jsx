import React from "react";
import { assets } from "../assets/assets";
import { Navigate, useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 mt-5"
      style={{
        background:
          "linear-gradient(103deg, rgb(231, 169, 83),rgb(115, 152, 206) 98.58%)",
      }}
    >
      {/* -------left side----- */}

      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24  lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white font-semibold">
          <p>Book Appointment</p>
          <p className="mt-4">with 100+ trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            window.scrollTo(0, 0);
          }}
          className=" cursor-pointer bg-white sm:text-base text-sm text-gray-600 px-8 py-3 text-center rounded-full mt-6 hover:scale-105 transition-all duration-500"
        >
          Create Account
        </button>
      </div>
      {/* -----------right side------- */}
      <div className="hidden md:block md:w-1/2  lg:w-[370px] relative">
        <img
          className="w-full absolute right-0 bottom-0 mx-w-md "
          src={assets.appointment_img}
          alt="appoitment"
        />
      </div>
    </div>
  );
};

export default Banner;
