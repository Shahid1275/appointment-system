// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDoctors } from "../redux/features/doctors/doctorSlice";

// const TopDoctors = () => {
//   const { doctors, status, error } = useSelector((state) => state.doctor);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Dispatch fetchDoctors on mount if not already fetched
//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchDoctors());
//     }
//   }, [status, dispatch]);

//   // Debug log for doctors data
//   useEffect(() => {
//     console.log("TopDoctors doctors:", JSON.stringify(doctors, null, 2));
//   }, [doctors]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       {status === "loading" && <p className="text-center">Loading...</p>}
//       {status === "failed" && (
//         <p className="text-center text-red-500">Error: {error}</p>
//       )}
//       <div className="text-center mb-10">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//           Top Doctors to Book
//         </h1>
//         <p className="text-gray-600">
//           Simply browse through our extensive list of trusted doctors
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//         {doctors.length > 0 ? (
//           doctors.slice(0, 10).map((item) => (
//             <div
//               onClick={() => navigate(`/appointment/${item._id}`)}
//               key={item._id}
//               className="border border-blue-200 rounded-xl overflow-hidden bg-gray-100
//                         transform transition-all duration-300 ease-in-out
//                         hover:shadow-xl hover:-translate-y-2 cursor-pointer"
//             >
//               <div className="relative h-48 overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={`Doctor ${item.name}`}
//                   className="absolute top-0 left-0 w-full h-full object-cover
//                             transition-transform duration-300 hover:scale-105"
//                   onError={(e) => {
//                     e.target.src = "/fallback-doctor-image.jpg";
//                   }}
//                 />
//               </div>
//               <div className="p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <div className="flex items-center">
//                     <div
//                       className={`w-2 h-2 rounded-full mr-2 ${
//                         item.available ? "bg-green-500" : "bg-red-500"
//                       }`}
//                     ></div>
//                     <p className="text-sm text-gray-500">
//                       {item.available ? "Available" : "Unavailable"}
//                     </p>
//                   </div>
//                 </div>
//                 <h3 className="font-semibold text-lg text-gray-900">
//                   {item.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm">
//                   {item.speciality || "N/A"}
//                 </p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg">
//             <p className="text-gray-500 mb-2">No doctors available</p>
//             <p className="text-sm text-gray-400">
//               Please try again later or select a specialty
//             </p>
//           </div>
//         )}
//       </div>

//       <div className="text-center mt-10">
//         <button
//           onClick={() => {
//             navigate("/doctors");
//             window.scrollTo(0, 0);
//           }}
//           className="px-5 py-2 text-gray-700 bg-blue-100 rounded-full
//                     font-medium text-lg tracking-wide border border-gray-200
//                     hover:bg-blue-200 cursor-pointer"
//         >
//           View More
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TopDoctors;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../redux/features/doctors/doctorSlice";

const TopDoctors = () => {
  const { doctors, status, error } = useSelector((state) => state.doctor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Dispatch fetchDoctors on mount as a fallback
  useEffect(() => {
    if (status === "idle" || status === "failed") {
      console.log(
        "TopDoctors.jsx - Dispatching fetchDoctors due to status:",
        status
      );
      dispatch(fetchDoctors());
    }
  }, [status, dispatch]);

  // Debug log for doctors data and status
  useEffect(() => {
    console.log("TopDoctors.jsx - Doctors state:", {
      doctors: JSON.stringify(doctors, null, 2),
      status,
      error,
    });
  }, [doctors, status, error]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {status === "loading" && (
        <p className="text-center text-gray-600">Loading doctors...</p>
      )}
      {status === "failed" && (
        <p className="text-center text-red-500">
          Error loading doctors: {error}
        </p>
      )}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Top Doctors to Book
        </h1>
        <p className="text-gray-600">
          Simply browse through our extensive list of trusted doctors
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {doctors.length > 0 ? (
          doctors.slice(0, 10).map((item) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={item._id}
              className="border border-blue-200 rounded-xl overflow-hidden bg-gray-100 
                        transform transition-all duration-300 ease-in-out 
                        hover:shadow-xl hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={`Doctor ${item.name}`}
                  className="absolute top-0 left-0 w-full h-full object-cover 
                            transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/fallback-doctor-image.jpg";
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        item.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <p className="text-sm text-gray-500">
                      {item.available ? "Available" : "Unavailable"}
                    </p>
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.speciality || "N/A"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-2">No doctors available</p>
            <p className="text-sm text-gray-400">
              Please try again later or select a specialty
            </p>
          </div>
        )}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => {
            navigate("/doctors");
            window.scrollTo(0, 0);
          }}
          className="px-5 py-2 text-gray-700 bg-blue-100 rounded-full 
                    font-medium text-lg tracking-wide border border-gray-200 
                    hover:bg-blue-200 cursor-pointer"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
