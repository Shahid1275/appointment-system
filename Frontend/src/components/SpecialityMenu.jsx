import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col gap-4 py-8 text-gray-800 items-center "
      id="speciality"
    >
      <h1 className="text-3xl font-semibold">Find doctors by speciality</h1>
      <p className="text-center text-sm sm:w-1/3">
        simply browse through our extensive list of trusted doctors, <br />
        schedule your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <img
              className="w-18 mb-2 sm:w-24"
              src={item.image}
              alt="the doctors image here"
            />
            {/* Always add alt text */}
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
