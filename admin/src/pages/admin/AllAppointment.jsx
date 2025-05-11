import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cancelAppointment,
  getallAppointments,
} from "../../redux/features/admin/adminSlice";
import { calculateAge } from "../../redux/features/app/appSlice";
import { assets } from "../../assets/assets";

const AllAppointment = () => {
  const dispatch = useDispatch();
  const { atoken, appointments, loading } = useSelector((state) => state.admin);
  const { currencySymbol } = useSelector((state) => state.app);

  useEffect(() => {
    if (atoken) dispatch(getallAppointments());
  }, [atoken, dispatch]);

  return (
    <div className="w-full m-4 ml-0 md:ml-64 p-4 min-h-screen transition-all duration-300">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-4 sm:px-6 border-b border-gray-100">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            All Appointments
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {appointments.length} total appointments
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          {/* Desktop and Tablet Table */}
          <table className="hidden md:table w-full text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 sm:px-6">#</th>
                <th className="px-4 py-3 sm:px-6">Patient</th>
                <th className="px-4 py-3 sm:px-6">Age</th>
                <th className="px-4 py-3 sm:px-6">Date & Time</th>
                <th className="px-4 py-3 sm:px-6">Doctor</th>
                <th className="px-4 py-3 sm:px-6">Fees</th>
                <th className="px-4 py-3 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-4 py-3 sm:px-6 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 mx-auto"></div>
                    <p className="mt-4 text-gray-600 text-base sm:text-lg">
                      Loading appointments...
                    </p>
                  </td>
                </tr>
              ) : (
                appointments.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 sm:px-6 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                          <img
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
                            src={item.userData.image || assets.default_user}
                            alt={item.userData.name}
                            onError={(e) =>
                              (e.target.src = assets.default_user)
                            }
                          />
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">
                            {item.userData.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.userData.phone || "No phone"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-6 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {item.userData.dob
                        ? calculateAge(item.userData.dob)
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3 sm:px-6 whitespace-nowrap">
                      <div className="text-xs sm:text-sm text-gray-900">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(item.date).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                          <img
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover bg-gray-200"
                            src={item.docData.image || assets.default_doctor}
                            alt={item.docData.name}
                            onError={(e) =>
                              (e.target.src = assets.default_doctor)
                            }
                          />
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">
                            {item.docData.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.docData.speciality}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-6 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                      {currencySymbol}
                      {item.amount}
                    </td>
                    <td className="px-4 py-3 sm:px-6 whitespace-nowrap text-right text-sm font-medium">
                      {item.cancelled ? (
                        <span className="px-2 sm:px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Cancelled
                        </span>
                      ) : item.isCompleted ? (
                        <p className="text-green-500">Completed</p>
                      ) : (
                        <button
                          onClick={() => dispatch(cancelAppointment(item._id))}
                          className="cursor-pointer text-red-600 hover:text-red-900 transition-colors duration-200"
                          title="Cancel Appointment"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 sm:ml-2 sm:mr-5"
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
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Mobile and Small Devices Cards */}
          <div className="md:hidden space-y-3 p-3 sm:p-4">
            {loading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 mx-auto"></div>
                <p className="mt-4 text-gray-600 text-base sm:text-lg">
                  Loading appointments...
                </p>
              </div>
            ) : (
              appointments.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-xs border border-gray-200 p-3 sm:p-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <img
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                        src={item.userData.image || assets.default_user}
                        alt={item.userData.name}
                        onError={(e) => (e.target.src = assets.default_user)}
                      />
                      <div>
                        <h3 className="text-sm sm:text-base font-medium text-gray-900">
                          {item.userData.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Age:{" "}
                          {item.userData.dob
                            ? calculateAge(item.userData.dob)
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    {item.cancelled ? (
                      <span className="px-2 py-1 text-xs font-semibold leading-none rounded-full bg-red-100 text-red-800">
                        Cancelled
                      </span>
                    ) : (
                      <button
                        onClick={() => dispatch(cancelAppointment(item._id))}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
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

                  <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Date & Time</p>
                      <p className="text-sm font-medium">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {new Date(item.date).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Doctor</p>
                      <div className="flex items-center mt-1">
                        <img
                          className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-cover mr-2 bg-gray-200"
                          src={item.docData.image || assets.default_doctor}
                          alt={item.docData.name}
                          onError={(e) =>
                            (e.target.src = assets.default_doctor)
                          }
                        />
                        <p className="text-sm font-medium">
                          {item.docData.name}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.docData.speciality}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 flex justify-between items-center">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Appointment Fee
                    </p>
                    <p className="text-sm font-medium">
                      {currencySymbol}
                      {item.amount}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Empty State */}
        {!loading && appointments.length === 0 && (
          <div className="p-8 sm:p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No appointments
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              There are currently no appointments scheduled.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointment;
