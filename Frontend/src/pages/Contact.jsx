import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="text-semibold text-lg text-gray-600">OUR OFFICE</p>
          <p className="text-gray-500">
            Near masjid Ayesha <br /> DHA PHASE 5, LAHORE, PAKISTAN
          </p>
          <p className="">
            Tel: (+92) 311-4446561 <br /> Email: shahidameen1275@gmail.com
          </p>
          <p className="font-semibold text-lg text-gray-600">
            Careers at oladoc
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>

          <button className=" cursor-pointer border border-gray-300 hover:bg-gray-500 text-black px-6 sm:px-8 py-2 sm:py-3 mt-8 transition-colors transition-all duration-300 text-sm sm:text-base">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
