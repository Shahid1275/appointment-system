import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDoctorAppointments,
  cancelAppointment,
  completeAppointment,
} from "../../redux/features/doctors/doctorSlice";
import { toast } from "react-toastify";
import { calculateAge } from "../../redux/features/app/appSlice";
import { TrashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const { dtoken, appointments, error, loading, doctorData } = useSelector(
    (state) => state.doctor
  );
  const { currencySymbol } = useSelector((state) => state.app);
  const isFetchDispatched = useRef(false);

  useEffect(() => {
    console.log("Doctor data:", doctorData);
    if (dtoken && !isFetchDispatched.current) {
      isFetchDispatched.current = true;
      dispatch(fetchDoctorAppointments()).finally(() => {
        isFetchDispatched.current = false;
      });
    } else if (!dtoken) {
      console.log("DoctorAppointments: No dtoken found");
      toast.error("Please log in to view appointments");
    }
  }, [dtoken, dispatch]);

  useEffect(() => {
    console.log("DoctorAppointments: appointments:", appointments);
    if (error) {
      console.log("DoctorAppointments: error:", error);
      toast.error(error);
    }
  }, [appointments, error]);

  // Sort appointments by date in descending order (newest first)
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-5 md:ml-64 min-h-screen transition-all duration-300">
      {/* Title */}
      <h2 className="mb-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
        All Appointments
      </h2>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header Row - Hidden on mobile */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 py-4 px-6 bg-gray-100 text-sm font-medium text-gray-700 border-b border-gray-200">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {/* Appointment List */}
        <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 mx-auto"></div>
              <p className="mt-4 text-gray-600 text-base sm:text-lg">
                Loading appointments...
              </p>
            </div>
          ) : sortedAppointments.length === 0 ? (
            <p className="p-6 text-center text-gray-500 text-base sm:text-lg">
              No appointments found.
            </p>
          ) : (
            sortedAppointments.map((item, index) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-3 sm:gap-4 p-4 sm:px-6 sm:py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                key={item._id}
              >
                {/* Index - Hidden on mobile */}
                <p className="hidden sm:block font-medium text-gray-600">
                  {index + 1}
                </p>

                {/* Patient Info - Full width on mobile */}
                <div className="flex items-center space-x-3 col-span-1 sm:col-span-1">
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">
                      {item.userData.name}
                    </p>
                    {/* Mobile-only details */}
                    <div className="sm:hidden flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                      <span>Age: {calculateAge(item.userData.dob)}</span>
                      <span>{item.payment ? "Online" : "Cash"}</span>
                      <span>
                        {currencySymbol}
                        {item.amount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment - Hidden on mobile */}
                <p
                  className={`hidden sm:block font-medium ${
                    item.payment ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  {item.payment ? "Online" : "Cash"}
                </p>

                {/* Age - Hidden on mobile */}
                <p className="hidden sm:block text-gray-600">
                  {calculateAge(item.userData.dob)}
                </p>

                {/* Date & Time */}
                <div className="col-span-1 sm:col-span-1">
                  <p className="text-sm font-medium text-gray-700 sm:font-normal">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {/* Fees - Hidden on mobile */}
                <p className="hidden sm:block text-gray-800 font-medium">
                  {currencySymbol}
                  {item.amount}
                </p>

                {/* Actions - Full width on mobile */}
                <div className="col-span-1 sm:col-span-1 flex justify-end sm:justify-start space-x-3 mt-2 sm:mt-0">
                  {item.cancelled ? (
                    <span className="px-2 font-semibold text-red-800">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-2  font-semibold text-green-800">
                      Completed
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => dispatch(cancelAppointment(item._id))}
                        className="p-2 cursor-pointer transition-all duration-200"
                        aria-label="Cancel appointment"
                      >
                        <TrashIcon className="w-6 h-6 text-red-600" />
                      </button>
                      <button
                        onClick={() => dispatch(completeAppointment(item._id))}
                        className="p-2 cursor-pointer transition-all duration-200"
                        aria-label="Confirm appointment"
                      >
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
