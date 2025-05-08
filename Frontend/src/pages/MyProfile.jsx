// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchUserProfile,
//   updateUserProfile,
// } from "../redux/features/doctors/doctorSlice";

// const MyProfile = () => {
//   const [isEdit, setIsEdit] = useState(false);
//   const [formData, setFormData] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null); // For image preview
//   const dispatch = useDispatch();
//   const { userData, token, status, error } = useSelector(
//     (state) => state.doctor
//   );

//   // Fetch user profile when component mounts or token changes
//   useEffect(() => {
//     if (token) {
//       console.log("Fetching user profile...");
//       dispatch(fetchUserProfile());
//     } else {
//       console.log("No token found, cannot fetch profile");
//     }
//   }, [token, dispatch]);

//   // Initialize formData when userData is loaded
//   useEffect(() => {
//     if (userData) {
//       console.log("User data received:", userData);
//       // Initialize formData with separate address fields
//       const formattedData = {
//         ...userData,
//         addressLine1: userData.address ? userData.address.line1 : "",
//         addressLine2: userData.address ? userData.address.line2 : "",
//       };
//       setFormData(formattedData);
//       setImagePreview(userData.image || "https://via.placeholder.com/150"); // Set initial image preview
//     } else {
//       console.log("No user data available");
//     }
//   }, [userData]);

//   // Handle input changes for text fields
//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   // Handle image file selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Update formData with the file
//       setFormData((prev) => ({ ...prev, imageFile: file }));
//       // Generate preview URL
//       const previewUrl = URL.createObjectURL(file);
//       setImagePreview(previewUrl);
//       console.log("Selected image file:", file.name);
//     }
//   };

//   // Clean up preview URL to avoid memory leaks
//   useEffect(() => {
//     return () => {
//       if (imagePreview && imagePreview.startsWith("blob:")) {
//         URL.revokeObjectURL(imagePreview);
//       }
//     };
//   }, [imagePreview]);

//   // Handle save
//   const handleSave = () => {
//     console.log("Saving profile data:", formData);
//     // Create FormData to handle file upload
//     const formDataToSend = new FormData();
//     formDataToSend.append("name", formData.name || "");
//     formDataToSend.append("email", formData.email || "");
//     formDataToSend.append("phone", formData.phone || "");
//     formDataToSend.append("address[line1]", formData.addressLine1 || "");
//     formDataToSend.append("address[line2]", formData.addressLine2 || "");
//     formDataToSend.append("gender", formData.gender || "");
//     formDataToSend.append("dob", formData.dob || "");
//     if (formData.imageFile) {
//       formDataToSend.append("image", formData.imageFile);
//     }

//     dispatch(updateUserProfile(formDataToSend));
//     setIsEdit(false);
//     // Reset image preview to the saved image URL after dispatch
//     setImagePreview(formData.image || "https://via.placeholder.com/150");
//   };

//   // Handle retry
//   const handleRetry = () => {
//     console.log("Retrying profile fetch...");
//     dispatch(fetchUserProfile());
//   };

//   // Log status and error for debugging
//   useEffect(() => {
//     console.log("Current status:", status);
//     if (error) {
//       console.log("Error:", error);
//     }
//   }, [status, error]);

//   // Show loading state
//   if (status === "loading" && !formData) {
//     return (
//       <div className="text-center p-4">
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   // Show error state with retry option
//   if (status === "failed") {
//     return (
//       <div className="text-center p-4 text-red-600">
//         <p>Failed to load profile: {error || "Unknown error"}</p>
//         <button
//           className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
//           onClick={handleRetry}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   // Fallback UI if no formData
//   if (!formData) {
//     return (
//       <div className="text-center p-4">
//         <p>No profile data available. Please try again.</p>
//         <button
//           className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
//           onClick={handleRetry}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto bg-white rounded-xl p-4 sm:p-6 flex flex-col gap-4 text-sm transition-all duration-300">
//       {/* Profile Image */}
//       <div className="flex justify-start items-center gap-4">
//         <img
//           className="w-32 h-32 sm:w-40 sm:h-40 rounded-full hover:scale-105 transition-transform duration-200"
//           src={imagePreview || "https://via.placeholder.com/150"}
//           alt="User Profile"
//         />
//         {isEdit && (
//           <input
//             type="file"
//             accept="image/*"
//             className="text-sm text-gray-600"
//             onChange={handleImageChange}
//           />
//         )}
//       </div>

//       {/* Name */}
//       <div className="text-start">
//         {isEdit ? (
//           <input
//             className="bg-gray-100 text-xl sm:text-2xl font-semibold text-gray-800 w-full max-w-xs p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             type="text"
//             value={formData.name || ""}
//             onChange={(e) => handleInputChange("name", e.target.value)}
//           />
//         ) : (
//           <p className="text-xl sm:text-2xl font-semibold text-gray-800">
//             {formData.name || "N/A"}
//           </p>
//         )}
//       </div>

//       <hr className="border-gray-300" />

//       {/* Contact Information */}
//       <div>
//         <p className="text-gray-500 font-medium uppercase tracking-wide text-xs sm:text-sm mb-3">
//           Contact Information
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-y-3 gap-x-4 text-gray-700">
//           <div className="flex items-center gap-2">
//             <svg
//               className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//               />
//             </svg>
//             <p className="font-medium text-sm sm:text-base">Email:</p>
//           </div>
//           <p className="text-blue-600 text-sm sm:text-base">
//             {formData.email || "N/A"}
//           </p>

//           <div className="flex items-center gap-2">
//             <svg
//               className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//               />
//             </svg>
//             <p className="font-medium text-sm sm:text-base">Phone:</p>
//           </div>
//           {isEdit ? (
//             <input
//               className="bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-52 text-blue-600 text-sm sm:text-base"
//               type="text"
//               value={formData.phone || ""}
//               onChange={(e) => handleInputChange("phone", e.target.value)}
//             />
//           ) : (
//             <p className="text-blue-600 text-sm sm:text-base">
//               {formData.phone || "N/A"}
//             </p>
//           )}

//           <div className="flex items-center gap-2">
//             <svg
//               className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//               />
//             </svg>
//             <p className="font-medium text-sm sm:text-base">Address Line 1:</p>
//           </div>
//           {isEdit ? (
//             <input
//               className="bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-600 text-sm sm:text-base"
//               type="text"
//               value={formData.addressLine1 || ""}
//               onChange={(e) =>
//                 handleInputChange("addressLine1", e.target.value)
//               }
//               placeholder="Address Line 1"
//             />
//           ) : (
//             <p className="text-gray-600 text-sm sm:text-base">
//               {formData.addressLine1 || "N/A"}
//             </p>
//           )}

//           <div className="flex items-center gap-2">
//             <svg
//               className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//               />
//             </svg>
//             <p className="font-medium text-sm sm:text-base">Address Line 2:</p>
//           </div>
//           {isEdit ? (
//             <input
//               className="bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-600 text-sm sm:text-base"
//               type="text"
//               value={formData.addressLine2 || ""}
//               onChange={(e) =>
//                 handleInputChange("addressLine2", e.target.value)
//               }
//               placeholder="Address Line 2"
//             />
//           ) : (
//             <p className="text-gray-600 text-sm sm:text-base">
//               {formData.addressLine2 || "N/A"}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Basic Information */}
//       <div>
//         <p className="text-gray-500 font-medium uppercase tracking-wide text-xs sm:text-sm mb-3">
//           Basic Information
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-y-3 gap-x-4 text-gray-700">
//           <div className="flex items-center gap-2">
//             <svg
//               className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//               />
//             </svg>
//             <p className="font-medium text-sm sm:text-base">Gender:</p>
//           </div>
//           {isEdit ? (
//             <select
//               className="bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-32 text-sm sm:text-base"
//               value={formData.gender || ""}
//               onChange={(e) => handleInputChange("gender", e.target.value)}
//             >
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//           ) : (
//             <p className="text-gray-600 text-sm sm:text-base">
//               {formData.gender || "N/A"}
//             </p>
//           )}

//           <div className="flex items-center gap-2">
//             <svg
//               className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//               />
//             </svg>
//             <p className="font-medium text-sm sm:text-base">Birthday:</p>
//           </div>
//           {isEdit ? (
//             <input
//               className="bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
//               type="date"
//               value={formData.dob || ""}
//               onChange={(e) => handleInputChange("dob", e.target.value)}
//             />
//           ) : (
//             <p className="text-gray-600 text-sm sm:text-base">
//               {formData.dob || "N/A"}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Action Button */}
//       <div className="mt-4 text-start">
//         {isEdit ? (
//           <button
//             className="cursor-pointer bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
//             onClick={handleSave}
//           >
//             Save Information
//           </button>
//         ) : (
//           <button
//             className="cursor-pointer bg-gray-200 text-gray-800 px-4 sm:px-6 py-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
//             onClick={() => setIsEdit(true)}
//           >
//             Edit Profile
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyProfile;
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../redux/features/doctors/doctorSlice";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const dispatch = useDispatch();
  const { userData, token, status, error } = useSelector(
    (state) => state.doctor
  );

  // Fetch user profile when component mounts or token changes
  useEffect(() => {
    if (token) {
      console.log("Fetching user profile...");
      dispatch(fetchUserProfile());
    } else {
      console.log("No token found, cannot fetch profile");
    }
  }, [token, dispatch]);

  // Initialize formData when userData is loaded
  useEffect(() => {
    if (userData) {
      console.log("User data received:", userData);
      // Initialize formData with separate address fields
      const formattedData = {
        ...userData,
        addressLine1: userData.address ? userData.address.line1 : "",
        addressLine2: userData.address ? userData.address.line2 : "",
      };
      setFormData(formattedData);
      setImagePreview(userData.image || "https://via.placeholder.com/150"); // Set initial image preview
    } else {
      console.log("No user data available");
    }
  }, [userData]);

  // Handle input changes for text fields
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update formData with the file
      setFormData((prev) => ({ ...prev, imageFile: file }));
      // Generate preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      console.log("Selected image file:", file.name);
    }
  };

  // Clean up preview URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Handle save
  const handleSave = () => {
    console.log("Saving profile data:", formData);

    // Check if phone and addressLine1 are provided
    if (!formData.phone || !formData.addressLine1) {
      toast.warn("Please provide phone and address to proceed with booking.");
      return;
    }

    // Create FormData to handle file upload
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name || "");
    formDataToSend.append("email", formData.email || "");
    formDataToSend.append("phone", formData.phone || "");
    formDataToSend.append("address[line1]", formData.addressLine1 || "");
    formDataToSend.append("address[line2]", formData.addressLine2 || "");
    formDataToSend.append("gender", formData.gender || "");
    formDataToSend.append("dob", formData.dob || "");
    if (formData.imageFile) {
      formDataToSend.append("image", formData.imageFile);
    }

    dispatch(updateUserProfile(formDataToSend));
    setIsEdit(false);
    // Reset image preview to the saved image URL after dispatch
    setImagePreview(formData.image || "https://via.placeholder.com/150");
  };

  // Handle retry
  const handleRetry = () => {
    console.log("Retrying profile fetch...");
    dispatch(fetchUserProfile());
  };

  // Log status and error for debugging
  useEffect(() => {
    console.log("Current status:", status);
    if (error) {
      console.log("Error:", error);
    }
  }, [status, error]);

  // Show loading state
  if (status === "loading" && !formData) {
    return (
      <div className="text-center p-4">
        <p>Loading profile...</p>
      </div>
    );
  }

  // Show error state with retry option
  if (status === "failed") {
    return (
      <div className="text-center p-4 text-red-600">
        <p>Failed to load profile: {error || "Unknown error"}</p>
        <button
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
          onClick={handleRetry}
        >
          Retry
        </button>
      </div>
    );
  }

  // Fallback UI if no formData
  if (!formData) {
    return (
      <div className="text-center p-4">
        <p>No profile data available. Please try again.</p>
        <button
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
          onClick={handleRetry}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto bg-white rounded-xl p-4 sm:p-6 flex flex-col gap-4 text-sm transition-all duration-300">
      {/* Profile Image */}
      <div className="flex justify-start items-center gap-4">
        <img
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full hover:scale-105 transition-transform duration-200"
          src={imagePreview || "https://via.placeholder.com/150"}
          alt="User Profile"
        />
        {isEdit && (
          <input
            type="file"
            accept="image/*"
            className="text-sm text-gray-600"
            onChange={handleImageChange}
          />
        )}
      </div>

      {/* Name */}
      <div className="text-start">
        {isEdit ? (
          <input
            className="bg-gray-100 text-xl sm:text-2xl font-semibold text-gray-800 w-full max-w-xs p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={formData.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        ) : (
          <p className="text-xl sm:text-2xl font-semibold text-gray-800">
            {formData.name || "N/A"}
          </p>
        )}
      </div>

      <hr className="border-gray-300" />

      {/* Contact Information */}
      <div>
        <p className="text-gray-500 font-medium uppercase tracking-wide text-xs sm:text-sm mb-3">
          Contact Information
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-y-3 gap-x-4 text-gray-700">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p className="font-medium text-sm sm:text-base">Email:</p>
          </div>
          <p className="text-blue-600 text-sm sm:text-base">
            {formData.email || "N/A"}
          </p>

          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <p className="font-medium text-sm sm:text-base">Phone:</p>
          </div>
          {isEdit ? (
            <input
              className="bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-52 text-blue-600 text-sm sm:text-base"
              type="text"
              value={formData.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          ) : (
            <p className="text-blue-600 text-sm sm:text-base">
              {formData.phone || "N/A"}
            </p>
          )}

          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="font-medium text-sm sm:text-base">Address Line 1:</p>
          </div>
          {isEdit ? (
            <input
              className="bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-600 text-sm sm:text-base"
              type="text"
              value={formData.addressLine1 || ""}
              onChange={(e) =>
                handleInputChange("addressLine1", e.target.value)
              }
              placeholder="Address Line 1"
            />
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">
              {formData.addressLine1 || "N/A"}
            </p>
          )}

          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="font-medium text-sm sm:text-base">Address Line 2:</p>
          </div>
          {isEdit ? (
            <input
              className="bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-600 text-sm sm:text-base"
              type="text"
              value={formData.addressLine2 || ""}
              onChange={(e) =>
                handleInputChange("addressLine2", e.target.value)
              }
              placeholder="Address Line 2"
            />
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">
              {formData.addressLine2 || "N/A"}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className="text-gray-500 font-medium uppercase tracking-wide text-xs sm:text-sm mb-3">
          Basic Information
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-y-3 gap-x-4 text-gray-700">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <p className="font-medium text-sm sm:text-base">Gender:</p>
          </div>
          {isEdit ? (
            <select
              className="bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-32 text-sm sm:text-base"
              value={formData.gender || ""}
              onChange={(e) => handleInputChange("gender", e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">
              {formData.gender || "N/A"}
            </p>
          )}

          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="font-medium text-sm sm:text-base">Birthday:</p>
          </div>
          {isEdit ? (
            <input
              className="bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
              type="date"
              value={formData.dob || ""}
              onChange={(e) => handleInputChange("dob", e.target.value)}
            />
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">
              {formData.dob || "N/A"}
            </p>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 text-start">
        {isEdit ? (
          <button
            className="cursor-pointer bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
            onClick={handleSave}
          >
            Save Information
          </button>
        ) : (
          <button
            className="cursor-pointer bg-gray-200 text-gray-800 px-4 sm:px-6 py-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
