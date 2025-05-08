import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useSelector } from "react-redux";

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useSelector((state) => state.doctor);
  const [relDoctors, setRelDoctors] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoctors(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Related Doctors</h1>
      <p className="sm:w-1/2 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-5">
        {relDoctors.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <img
              className="w-full h-48 object-contain bg-blue-100"
              src={item.image || assets.default_doctor}
              alt={item.name}
              onError={(e) => (e.target.src = assets.default_doctor)}
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium mt-2">
                {item.name}
              </p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className=" cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-full mt-8 hover:bg-blue-700 transition-colors duration-300 text-base font-medium"
      >
        View More
      </button>
    </div>
  );
};

export default RelatedDoctors;
