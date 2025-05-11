import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cancelAppointment,
  getDashData,
} from "../../redux/features/doctors/doctorSlice";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { dtoken, loading, error } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const [dashData, setDashData] = useState(null); // Local state to store dashboard data

  useEffect(() => {
    if (dtoken) {
      dispatch(getDashData())
        .unwrap()
        .then((data) => {
          if (data.success) {
            setDashData(data.dashData); // Store the nested dashData object
          }
        })
        .catch((err) => {
          console.error("Failed to fetch dashboard data:", err);
        });
    }
  }, [dtoken, dispatch]);

  return (
    <div className="w-full max-w-6xl m-5 ml-0 md:ml-64 p-5 min-h-screen transition-all duration-300">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Doctor Dashboard
      </h1>

      {/* Loading and Error States */}
      {loading && <p className="text-gray-600">Loading dashboard data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Stats Cards */}
      {dashData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={assets.earning_icon}
              alt="Earnings"
              className="w-10 h-10 object-contain"
            />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                ${dashData.earnings}
              </p>
              <p className="text-sm text-gray-600">Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={assets.appointments_icon}
              alt="Appointments"
              className="w-10 h-10 object-contain"
            />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {dashData.appointments}
              </p>
              <p className="text-sm text-gray-600">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={assets.patients_icon}
              alt="Patients"
              className="w-10 h-10 object-contain"
            />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {dashData.patients}
              </p>
              <p className="text-sm text-gray-600">Patients</p>
            </div>
          </div>
        </div>
      ) : (
        !loading &&
        !error && <p className="text-gray-600">No dashboard data available.</p>
      )}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b">
          <img src={assets.list_icon} alt="Bookings" className="w-5 h-5" />
          <h2 className="font-semibold text-lg text-gray-800">
            Latest Bookings
          </h2>
        </div>
        <div className="divide-y">
          {dashData && dashData.latestAppointments?.length > 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">
                    <img src={item.userData.image} alt="" />
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {item.userData.name}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-sm text-gray-600">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-sm text-gray-500">{item.time}</span>
                  </div>
                </div>
                {item.cancelled ? (
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => dispatch(cancelAppointment(item._id))} // Updated to use dispatch
                    className="cursor-pointer text-red-600 hover:text-red-900 transition-colors duration-200"
                    title="Cancel Appointment"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2 mr-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              {dashData ? "No appointments found" : "Loading appointments..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
