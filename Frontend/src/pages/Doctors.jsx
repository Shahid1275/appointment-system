// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDoctors } from "../redux/features/doctors/doctorSlice";

// const Doctors = () => {
//   const [filteredDoc, setFilteredDoc] = useState([]);
//   const { speciality } = useParams();
//   const { doctors, status, error } = useSelector((state) => state.doctor);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Dispatch fetchDoctors on mount if not already fetched
//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchDoctors());
//     }
//   }, [status, dispatch]);

//   // Log unique specialties
//   useEffect(() => {
//     const uniqueSpecialties = [
//       ...new Set(doctors.map((d) => d.speciality).filter(Boolean)),
//     ];
//     console.log("Existing specialties:", uniqueSpecialties);
//   }, [doctors]);

//   const normalizeName = (name) => {
//     return name ? name.trim().toLowerCase().replace(/\s+/g, " ") : "";
//   };

//   const applyFilter = () => {
//     console.log("Filtering for speciality:", speciality); // Debug log
//     console.log("All doctors:", JSON.stringify(doctors, null, 2)); // Debug log

//     if (speciality) {
//       const decodedSpeciality = decodeURIComponent(speciality);
//       const normalizedSpeciality = normalizeName(decodedSpeciality);
//       const filtered = doctors.filter(
//         (doctor) => normalizeName(doctor.speciality) === normalizedSpeciality
//       );
//       console.log("Filtered doctors:", JSON.stringify(filtered, null, 2)); // Debug log
//       setFilteredDoc(filtered);
//     } else {
//       setFilteredDoc(doctors);
//     }
//   };

//   useEffect(() => {
//     applyFilter();
//   }, [doctors, speciality]);

//   // Hardcoded specialties, corrected typo
//   const specialtyOptions = [
//     "General Physician",
//     "Gynecologist",
//     "Dermatologist",
//     "Pediatricians",
//     "Neurologist",
//     "Gastroentrologist",
//   ];

//   return (
//     <div className="px-4 py-6 max-w-7xl mx-auto">
//       {status === "loading" && <p className="text-center">Loading...</p>}
//       {status === "failed" && (
//         <p className="text-center text-red-500">Error: {error}</p>
//       )}
//       <p className="text-gray-600 text-center sm:text-left mb-6 text-lg">
//         Browse through the doctors specialists.
//       </p>

//       {/* Specialties List - Fixed at the top */}
//       <div className="sticky top-0 z-10 bg-white pb-4">
//         <div className="flex gap-2 overflow-x-auto lg:overflow-x-visible">
//           {specialtyOptions.map((spec) => (
//             <button
//               key={spec}
//               onClick={() => {
//                 const normalizedSpec = normalizeName(spec);
//                 const normalizedUrlSpec = speciality
//                   ? normalizeName(decodeURIComponent(speciality))
//                   : "";
//                 normalizedUrlSpec === normalizedSpec
//                   ? navigate("/doctors")
//                   : navigate(`/doctors/${encodeURIComponent(spec)}`);
//               }}
//               className={`whitespace-nowrap px-4 py-2 rounded-full transition-all cursor-pointer text-sm
//                 ${
//                   speciality &&
//                   normalizeName(decodeURIComponent(speciality)) ===
//                     normalizeName(spec)
//                     ? "bg-blue-100 text-blue-700 border border-blue-200"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//             >
//               {spec}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Doctors Grid */}
//       <div>
//         {filteredDoc.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//             {filteredDoc.map((item) => (
//               <div
//                 onClick={() => navigate(`/appointment/${item._id}`)}
//                 key={item._id}
//                 className="border border-gray-200 rounded-lg overflow-hidden bg-white
//                       transform transition-all duration-300 ease-in-out
//                       hover:shadow-md hover:-translate-y-1 cursor-pointer"
//               >
//                 <div className="relative pt-[75%] overflow-hidden">
//                   <img
//                     src={item.image}
//                     alt={`Doctor ${item.name}`}
//                     className="absolute top-0 left-0 w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.src = "/fallback-doctor-image.jpg";
//                     }}
//                   />
//                 </div>
//                 <div className="p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center">
//                       <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//                       <p className="text-xs text-gray-500">
//                         {item.available ? "Available" : "Unavailable"}
//                       </p>
//                     </div>
//                     <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
//                       {item.experience}
//                     </span>
//                   </div>
//                   <h3 className="font-semibold text-gray-900">{item.name}</h3>
//                   <p className="text-gray-600 text-sm mt-1">
//                     {item.speciality || "N/A"}
//                   </p>
//                   <p className="text-gray-500 text-xs mt-2">
//                     {item.address?.address1 || "N/A"}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10 bg-gray-50 rounded-lg">
//             <p className="text-gray-500 mb-2">No doctors available</p>
//             <p className="text-sm text-gray-400">
//               {speciality
//                 ? `for "${decodeURIComponent(speciality)}" specialty`
//                 : "Please select a specialty"}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Doctors;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../redux/features/doctors/doctorSlice";

const Doctors = () => {
  const [filteredDoc, setFilteredDoc] = useState([]);
  const { speciality } = useParams();
  const { doctors, status, error } = useSelector((state) => state.doctor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Dispatch fetchDoctors on mount
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  // Log unique specialties for debugging
  useEffect(() => {
    const uniqueSpecialties = [
      ...new Set(doctors.map((d) => d.speciality).filter(Boolean)),
    ];
    console.log("Doctors.jsx - Unique specialties:", uniqueSpecialties);
  }, [doctors]);

  const normalizeName = (name) => {
    return name ? name.trim().toLowerCase().replace(/\s+/g, " ") : "";
  };

  const applyFilter = () => {
    console.log("Doctors.jsx - Filtering for speciality:", speciality);
    console.log("Doctors.jsx - All doctors:", JSON.stringify(doctors, null, 2));

    if (speciality) {
      const decodedSpeciality = decodeURIComponent(speciality);
      const normalizedSpeciality = normalizeName(decodedSpeciality);
      const filtered = doctors.filter(
        (doctor) => normalizeName(doctor.speciality) === normalizedSpeciality
      );
      console.log(
        "Doctors.jsx - Filtered doctors:",
        JSON.stringify(filtered, null, 2)
      );
      setFilteredDoc(filtered);
    } else {
      setFilteredDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  // Hardcoded specialties
  const specialtyOptions = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroentrologist",
  ];

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      {status === "loading" && (
        <p className="text-center text-gray-600">Loading doctors...</p>
      )}
      {status === "failed" && (
        <p className="text-center text-red-500">Error: {error}</p>
      )}
      <p className="text-gray-600 text-center sm:text-left mb-6 text-lg">
        Browse through the doctors specialists.
      </p>

      {/* Specialties List - Fixed at the top */}
      <div className="sticky top-0 z-10 bg-white pb-4">
        <div className="flex gap-2 overflow-x-auto lg:overflow-x-visible">
          {specialtyOptions.map((spec) => (
            <button
              key={spec}
              onClick={() => {
                const normalizedSpec = normalizeName(spec);
                const normalizedUrlSpec = speciality
                  ? normalizeName(decodeURIComponent(speciality))
                  : "";
                normalizedUrlSpec === normalizedSpec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${encodeURIComponent(spec)}`);
              }}
              className={`whitespace-nowrap px-4 py-2 rounded-full transition-all cursor-pointer text-sm
                ${
                  speciality &&
                  normalizeName(decodeURIComponent(speciality)) ===
                    normalizeName(spec)
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      <div>
        {filteredDoc.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredDoc.map((item) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                key={item._id}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white 
                      transform transition-all duration-300 ease-in-out 
                      hover:shadow-md hover:-translate-y-1 cursor-pointer"
              >
                <div className="relative pt-[75%] overflow-hidden">
                  <img
                    src={item.image}
                    alt={`Doctor ${item.name}`}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/fallback-doctor-image.jpg";
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <p className="text-xs text-gray-500">
                        {item.available ? "Available" : "Unavailable"}
                      </p>
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                      {item.experience}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {item.speciality || "N/A"}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    {item.address?.address1 || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-2">No doctors available</p>
            <p className="text-sm text-gray-400">
              {speciality
                ? `for "${decodeURIComponent(speciality)}" specialty`
                : "Please select a specialty"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
