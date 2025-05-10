// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDoctorAppointments } from "../../redux/features/doctors/doctorSlice";
// const DoctorAppointments = () => {
//   const dispatch = useDispatch();
//   const { dtoken } = useSelector((state) => state.doctor);
//   useEffect(() => {
//     if (dtoken) {
//       dispatch(fetchDoctorAppointments());
//     }
//   }, [dtoken]);
//   return (
//     <div className="w-full max-w-6xl m-5 ml-0 md:ml-64 p-5 min-h-screen transition-all duration-300">
//       DoctorAppointments
//     </div>
//   );
// };

// export default DoctorAppointments;
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctorAppointments } from "../../redux/features/doctors/doctorSlice";
import { toast } from "react-toastify";

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const { dtoken, appointments, loading, error } = useSelector(
    (state) => state.doctor
  );

  useEffect(() => {
    if (dtoken) {
      console.log(
        "DoctorAppointments: Dispatching fetchDoctorAppointments with dtoken:",
        dtoken
      );
      dispatch(fetchDoctorAppointments());
    } else {
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

  return (
    <div className="w-full max-w-6xl m-5 ml-0 md:ml-64 p-5 min-h-screen transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Doctor Appointments
      </h2>
      {loading && <p className="text-gray-600">Loading appointments...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && !error && appointments.length === 0 && (
        <p className="text-gray-600">No appointments found.</p>
      )}
      {!loading && !error && appointments.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.patientName || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.time || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.status || "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
