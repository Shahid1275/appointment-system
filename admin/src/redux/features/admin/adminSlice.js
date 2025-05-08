// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";

// // Get token from localStorage if exists
// const getInitialToken = () => {
//   try {
//     return localStorage.getItem("atoken") || null;
//   } catch (error) {
//     console.error("Error accessing localStorage:", error);
//     return null;
//   }
// };

// const initialState = {
//   adminMode: false,
//   atoken: getInitialToken(),
//   backendUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
//   doctors: [],
//   loading: false,
//   error: null,
// };

// export const adminSlice = createSlice({
//   name: "admin",
//   initialState,
//   reducers: {
//     setAdminMode: (state, action) => {
//       state.adminMode = action.payload;
//     },
//     setAToken: (state, action) => {
//       state.atoken = action.payload;
//       try {
//         if (action.payload) {
//           localStorage.setItem("atoken", action.payload);
//         } else {
//           localStorage.removeItem("atoken");
//         }
//       } catch (error) {
//         console.error("Error accessing localStorage:", error);
//       }
//     },
//     logout: (state) => {
//       state.atoken = null;
//       state.adminMode = false;
//       state.doctors = [];
//       try {
//         localStorage.removeItem("atoken");
//       } catch (error) {
//         console.error("Error clearing localStorage:", error);
//       }
//     },
//     setDoctors: (state, action) => {
//       state.doctors = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     updateDoctorAvailability: (state, action) => {
//       const { docId } = action.payload;
//       state.doctors = state.doctors.map((doctor) =>
//         doctor._id === docId
//           ? { ...doctor, available: !doctor.available }
//           : doctor
//       );
//     },
//   },
// });

// // Async action to change availability
// export const changeAvailability = (docId) => async (dispatch, getState) => {
//   const { backendUrl, atoken } = getState().admin;

//   if (!atoken) {
//     toast.error("Authentication required");
//     return;
//   }

//   try {
//     const { data } = await axios.post(
//       `${backendUrl}/admin/change-availability`,
//       { docId },
//       {
//         headers: {
//           Authorization: `Bearer ${atoken}`,
//         },
//       }
//     );

//     if (data.success) {
//       toast.success("Availability changed successfully");
//       dispatch(updateDoctorAvailability({ docId }));
//     } else {
//       toast.error(data.message || "Error changing availability");
//     }
//     return data;
//   } catch (error) {
//     const errorMsg =
//       error.response?.data?.message || "Error changing availability";
//     console.error("Change availability error:", errorMsg);
//     toast.error(errorMsg);

//     if (error.response?.status === 401) {
//       console.log("Unauthorized: Logging out due to invalid token");
//       toast.error("Session expired. Please log in again.");
//       dispatch(logout());
//     }

//     throw error;
//   }
// };

// // Async action to fetch all doctors
// export const fetchAllDoctors = () => async (dispatch, getState) => {
//   const { backendUrl, atoken } = getState().admin;

//   if (!atoken) {
//     console.warn("fetchAllDoctors: No token provided");
//     dispatch(setError("No authentication token provided"));
//     toast.error("Please log in to access doctors list");
//     return;
//   }

//   try {
//     dispatch(setLoading(true));
//     console.log("fetchAllDoctors: Sending request with token:", atoken);
//     const { data } = await axios.post(
//       `${backendUrl}/admin/all-doctors`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${atoken}`,
//         },
//       }
//     );

//     console.log("fetchAllDoctors: Response received:", data);
//     if (data.success) {
//       dispatch(setDoctors(data.data || []));
//     } else {
//       dispatch(setError(data.message || "Failed to fetch doctors"));
//       toast.error(data.message || "Failed to fetch doctors");
//     }
//   } catch (error) {
//     const errorMsg =
//       error.response?.status === 404
//         ? "Doctors endpoint not found. Please check the backend server."
//         : error.response?.data?.message ||
//           error.message ||
//           "Failed to fetch doctors";
//     console.error("fetchAllDoctors error:", errorMsg, error.response);
//     dispatch(setError(errorMsg));

//     if (error.response?.status === 401) {
//       console.log("fetchAllDoctors: Unauthorized, logging out");
//       toast.error("Session expired. Please log in again.");
//       dispatch(logout());
//     } else {
//       toast.error(errorMsg);
//     }
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// export const {
//   setAdminMode,
//   setAToken,
//   logout,
//   setDoctors,
//   setLoading,
//   setError,
//   updateDoctorAvailability,
// } = adminSlice.actions;

// export default adminSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Get token from localStorage if exists
const getInitialToken = () => {
  try {
    return localStorage.getItem("atoken") || "";
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return "";
  }
};

const initialState = {
  adminMode: false,
  atoken: getInitialToken(),
  backendUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  doctors: [],
  loading: false,
  error: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminMode: (state, action) => {
      state.adminMode = action.payload;
    },
    setAToken: (state, action) => {
      state.atoken = action.payload;
      try {
        if (action.payload) {
          localStorage.setItem("atoken", action.payload);
        } else {
          localStorage.removeItem("atoken");
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
    },
    logout: (state) => {
      state.atoken = "";
      state.adminMode = false;
      state.doctors = [];
      try {
        localStorage.removeItem("atoken");
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
    },
    setDoctors: (state, action) => {
      state.doctors = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateDoctorAvailability: (state, action) => {
      const { docId } = action.payload;
      state.doctors = state.doctors.map((doctor) =>
        doctor._id === docId
          ? { ...doctor, available: !doctor.available }
          : doctor
      );
    },
  },
});

// Async action to change availability
export const changeAvailability = (docId) => async (dispatch, getState) => {
  const { backendUrl, atoken } = getState().admin;

  try {
    const { data } = await axios.post(
      `${backendUrl}/admin/change-availability`,
      { docId },
      { headers: { atoken } }
    );

    if (data.message === "Availability changed successfully") {
      toast.success("Availability changed successfully");
      dispatch(updateDoctorAvailability({ docId }));
    } else {
      toast.error(data.message || "Error changing availability");
    }
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Error changing availability");
    throw error;
  }
};

// Async action to fetch all doctors
export const fetchAllDoctors = () => async (dispatch, getState) => {
  const { backendUrl, atoken } = getState().admin;

  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(
      `${backendUrl}/admin/all-doctors`,
      {},
      { headers: { atoken } }
    );

    if (data.success) {
      dispatch(setDoctors(data.data || []));
    } else {
      dispatch(setError(data.message || "Failed to fetch doctors"));
      toast.error(data.message || "Failed to fetch doctors");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("Error in fetchAllDoctors:", errorMessage);
    dispatch(setError(errorMessage));
    toast.error(errorMessage);
  }
};

export const {
  setAdminMode,
  setAToken,
  logout,
  setDoctors,
  setLoading,
  setError,
  updateDoctorAvailability,
} = adminSlice.actions;

export default adminSlice.reducer;
