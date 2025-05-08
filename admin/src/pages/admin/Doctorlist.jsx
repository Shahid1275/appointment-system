import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllDoctors,
  changeAvailability,
} from "../../redux/features/admin/adminSlice";

const Doctorlist = () => {
  const { doctors, atoken, loading, error } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const [loadingAvailability, setLoadingAvailability] = useState({});

  useEffect(() => {
    if (atoken) {
      console.log("Doctorlist: Fetching doctors with token:", atoken);
      dispatch(fetchAllDoctors());
    } else {
      console.warn("Doctorlist: No atoken found, cannot fetch doctors");
    }
  }, [atoken, dispatch]);

  const handleAvailabilityChange = async (docId) => {
    setLoadingAvailability((prev) => ({ ...prev, [docId]: true }));
    try {
      await dispatch(changeAvailability(docId));
    } catch (error) {
      console.error("Doctorlist: Failed to change availability:", error);
    } finally {
      setLoadingAvailability((prev) => ({ ...prev, [docId]: false }));
    }
  };

  return (
    <div className="ml-0 md:ml-64 p-5 min-h-screen transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Doctors</h1>

        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading doctors...</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && doctors.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No doctors found</p>
          </div>
        )}

        {!loading && !error && doctors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {doctors.map((item) => (
              <div
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white group"
                key={item._id}
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {item.speciality}
                  </p>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        onChange={() => handleAvailabilityChange(item._id)}
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.available}
                        disabled={loadingAvailability[item._id]}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {loadingAvailability[item._id]
                          ? "Updating..."
                          : item.available
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctorlist;
