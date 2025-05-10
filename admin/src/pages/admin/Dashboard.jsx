import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdminDashboard } from "../../redux/features/admin/adminSlice";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardData, atoken, loading, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    if (atoken) {
      dispatch(fetchAdminDashboard());
    }
  }, [atoken, dispatch]);

  const LoadingSkeleton = () => (
    <div className="w-full max-w-6xl m-5 ml-0 md:ml-64 p-5 min-h-screen animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-6 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) return <LoadingSkeleton />;
  if (error)
    return (
      <div className="w-full max-w-6xl m-5 p-5 md:ml-64 min-h-screen">
        <div className="p-4 bg-red-50 text-red-600 rounded-lg shadow">
          Error: {error}
        </div>
      </div>
    );
  if (!dashboardData)
    return (
      <div className="w-full max-w-6xl m-5 p-5 md:ml-64 min-h-screen">
        <div className="p-4 bg-gray-50 text-gray-600 rounded-lg shadow">
          No data available
        </div>
      </div>
    );

  return (
    <div className="w-full max-w-6xl m-5 p-5 md:ml-64 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <img
            src={assets.doctor_icon}
            alt="Doctors"
            className="w-10 h-10 object-contain"
          />
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {dashboardData.doctors ?? 0}
            </p>
            <p className="text-sm text-gray-600">Doctors</p>
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
              {dashboardData.appointments ?? 0}
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
              {dashboardData.patients ?? 0}
            </p>
            <p className="text-sm text-gray-600">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b">
          <img src={assets.list_icon} alt="Bookings" className="w-5 h-5" />
          <h2 className="font-semibold text-lg text-gray-800">
            Latest Bookings
          </h2>
        </div>

        <div className="divide-y">
          {dashboardData.latestAppointments?.length > 0 ? (
            dashboardData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                <img
                  src={item.docData.image}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {item.docData.name}
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
                    <span className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                {item.cancelled ? (
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Cancelled
                  </span>
                ) : (
                  <button
                    className="cursor-pointer text-red-600 hover:text-red-900 transition-colors duration-200 "
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
              No appointments found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
