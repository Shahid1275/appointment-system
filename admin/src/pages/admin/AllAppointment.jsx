// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   cancelAppointment,
//   getallAppointments,
// } from "../../redux/features/admin/adminSlice";
// import { calculateAge } from "../../redux/features/app/appSlice";
// import { assets } from "../../assets/assets";

// const AllAppointment = () => {
//   const dispatch = useDispatch();
//   const { atoken, appointments } = useSelector((state) => state.admin);
//   const { currencySymbol } = useSelector((state) => state.app);

//   useEffect(() => {
//     if (atoken) dispatch(getallAppointments());
//   }, [atoken, dispatch]);

//   return (
//     <div className="w-full max-w-6xl m-5 ml-0 md:ml-64 p-5 min-h-screen transition-all duration-300">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">
//           All Appointments
//         </h1>
//         <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
//           {/* Desktop Table Header */}
//           <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] border-b py-3 px-6 text-gray-600 font-medium">
//             <p>#</p>
//             <p>Patient</p>
//             <p>Age</p>
//             <p>Date & Time</p>
//             <p>Doctor</p>
//             <p>Fees</p>
//             <p>Actions</p>
//           </div>
//           {/* Appointments List */}
//           {appointments.map((item, index) => (
//             <div
//               key={index}
//               className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 px-3 py-3 border-b hover:bg-gray-50 max-sm:grid-cols-1 max-sm:gap-1 max-sm:py-4"
//             >
//               {/* Desktop Table Row */}
//               <p className="max-sm:hidden">{index + 1}</p>
//               <div className="flex items-center gap-2">
//                 <img
//                   className="w-8 rounded-full"
//                   src={item.userData.image}
//                   alt={item.userData.name}
//                   onError={(e) => (e.target.src = "/fallback-image.png")}
//                 />
//                 <p className="font-medium">{item.userData.name}</p>
//               </div>
//               <p className="max-sm:text-xs max-sm:ml-10">
//                 <span className="sm:hidden font-medium">Age: </span>
//                 {item.userData.dob ? calculateAge(item.userData.dob) : "N/A"}
//               </p>
//               <p className="max-sm:text-xs max-sm:ml-10">
//                 <span className="sm:hidden font-medium">Date: </span>
//                 {new Date(item.date).toLocaleString("en-US", {
//                   dateStyle: "medium",
//                   timeStyle: "short",
//                 })}
//               </p>
//               <div className="flex items-center gap-2">
//                 <img
//                   className="w-8 rounded-full bg-gray-200"
//                   src={item.docData.image}
//                   alt=""
//                   onError={(e) => (e.target.src = "/fallback-image.png")}
//                 />
//                 <p className="font-medium">{item.docData.name}</p>
//               </div>
//               <p className="max-sm:text-xs max-sm:ml-10">
//                 <span className="sm:hidden font-medium">Fees: </span>
//                 {currencySymbol}
//                 {item.amount}
//               </p>
//               {item.cancelled ? (
//                 <p className="text-red-400 text-xs font-medium">Cancelled</p>
//               ) : (
//                 <img
//                   onClick={() => dispatch(cancelAppointment(item._id))}
//                   className="w-10 cursor-pointer "
//                   src={assets.cancel_icon}
//                 />
//               )}
//             </div>
//           ))}
//           {appointments.length === 0 && (
//             <div className="text-center py-10 text-gray-500">
//               No appointments found.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllAppointment;
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
  const { atoken, appointments } = useSelector((state) => state.admin);
  const { currencySymbol } = useSelector((state) => state.app);

  useEffect(() => {
    if (atoken) dispatch(getallAppointments());
  }, [atoken, dispatch]);

  return (
    <div className="w-full max-w-6xl m-5 ml-0 md:ml-64 p-5 min-h-screen transition-all duration-300">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">All Appointments</h1>
          <p className="text-sm text-gray-500 mt-1">
            {appointments.length} total appointments
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="hidden md:table w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Age</th>
                <th className="px-6 py-3">Date & Time</th>
                <th className="px-6 py-3">Doctor</th>
                <th className="px-6 py-3">Fees</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={item.userData.image || assets.default_user}
                          alt={item.userData.name}
                          onError={(e) => (e.target.src = assets.default_user)}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.userData.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.userData.phone || "No phone"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.userData.dob
                      ? calculateAge(item.userData.dob)
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover bg-gray-200"
                          src={item.docData.image || assets.default_doctor}
                          alt={item.docData.name}
                          onError={(e) =>
                            (e.target.src = assets.default_doctor)
                          }
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.docData.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.docData.speciality}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {currencySymbol}
                    {item.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {item.cancelled ? (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Cancelled
                      </span>
                    ) : (
                      <button
                        onClick={() => dispatch(cancelAppointment(item._id))}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 p-4">
            {appointments.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-xs border border-gray-200 p-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={item.userData.image || assets.default_user}
                      alt={item.userData.name}
                      onError={(e) => (e.target.src = assets.default_user)}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {item.userData.name}
                      </h3>
                      <p className="text-sm text-gray-500">
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
                      className="text-red-500 hover:text-red-700"
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

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Date & Time</p>
                    <p className="text-sm font-medium">
                      {new Date(item.date).toLocaleDateString("en-US", {
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
                  <div>
                    <p className="text-xs text-gray-500">Doctor</p>
                    <div className="flex items-center mt-1">
                      <img
                        className="h-6 w-6 rounded-full object-cover mr-2 bg-gray-200"
                        src={item.docData.image || assets.default_doctor}
                        alt={item.docData.name}
                        onError={(e) => (e.target.src = assets.default_doctor)}
                      />
                      <p className="text-sm font-medium">{item.docData.name}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.docData.speciality}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <p className="text-sm text-gray-500">Appointment Fee</p>
                  <p className="text-sm font-medium">
                    {currencySymbol}
                    {item.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="p-12 text-center">
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
