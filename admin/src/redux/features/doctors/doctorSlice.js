// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";

// // Get token from localStorage if exists
// const getInitialToken = () => {
//   try {
//     const token = localStorage.getItem("dtoken") || "";
//     console.log("doctorSlice: Initial dtoken from localStorage:", token);
//     return token;
//   } catch (error) {
//     console.error("Error accessing localStorage:", error);
//     return "";
//   }
// };

// const initialState = {
//   backendUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
//   dtoken: getInitialToken(),
//   doctorData: null,
//   appointments: [],
//   loading: false,
//   error: null,
// };

// export const loginDoctor = createAsyncThunk(
//   "doctor/loginDoctor",
//   async ({ email, password }, { dispatch, rejectWithValue }) => {
//     const backendUrl =
//       import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
//     try {
//       const response = await axios.post(`${backendUrl}/api/doctor/login`, {
//         email,
//         password,
//       });

//       const { data } = response;
//       if (data?.success) {
//         dispatch(setDoctorToken(data.token));
//         if (data.doctor) {
//           dispatch(setDoctorData(data.doctor));
//         }
//         return data;
//       } else {
//         toast.error(data?.message || "Invalid credentials");
//         return rejectWithValue(data?.message || "Invalid credentials");
//       }
//     } catch (error) {
//       const errorMsg =
//         error.response?.data?.message ||
//         error.message ||
//         "Login failed. Please try again.";
//       toast.error(errorMsg);
//       return rejectWithValue(errorMsg);
//     }
//   }
// );

// export const fetchDoctorAppointments = createAsyncThunk(
//   "doctor/fetchDoctorAppointments",
//   async (_, { getState, dispatch, rejectWithValue }) => {
//     const { backendUrl, dtoken } = getState().doctor;

//     try {
//       dispatch(setLoading(true));
//       const response = await axios.get(
//         `${backendUrl}/api/doctor/appointments`,
//         {
//           headers: { Authorization: `Bearer ${dtoken}` },
//         }
//       );

//       const { data } = response;
//       if (data.success) {
//         dispatch(setAppointments(data.data || []));
//         console.log(data.data);
//         if (data.doctor) {
//           dispatch(setDoctorData(data.doctor));
//         }
//         return data.data;
//       } else {
//         dispatch(setError(data.message || "Failed to fetch appointments"));
//         toast.error(data.message || "Failed to fetch appointments");
//         return rejectWithValue(data.message || "Failed to fetch appointments");
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       console.error("Error in fetchDoctorAppointments:", errorMessage);
//       dispatch(setError(errorMessage));
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// export const doctorSlice = createSlice({
//   name: "doctor",
//   initialState,
//   reducers: {
//     setDoctorToken: (state, action) => {
//       state.dtoken = action.payload;
//       try {
//         if (action.payload) {
//           localStorage.setItem("dtoken", action.payload);
//         } else {
//           localStorage.removeItem("dtoken");
//           toast.success("Doctor token removed successfully");
//         }
//       } catch (error) {
//         console.error("Error accessing localStorage:", error);
//         state.error = "Failed to access localStorage";
//         toast.error("Failed to access localStorage");
//       }
//     },
//     setDoctorData: (state, action) => {
//       state.doctorData = action.payload;
//       state.error = null;
//     },
//     setAppointments: (state, action) => {
//       state.appointments = action.payload;
//       state.error = null;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     logout: (state) => {
//       state.dtoken = "";
//       state.doctorData = null;
//       state.appointments = [];
//       state.error = null;
//       try {
//         localStorage.removeItem("dtoken");
//         console.log("doctorSlice: Removed dtoken from localStorage");
//       } catch (error) {
//         console.error("Error accessing localStorage:", error);
//         state.error = "Failed to clear localStorage";
//         toast.error("Failed to clear localStorage");
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginDoctor.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginDoctor.fulfilled, (state) => {
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(loginDoctor.rejected, (state, action) => {
//         state.error = action.payload || "Failed to login";
//         state.loading = false;
//       })
//       .addCase(fetchDoctorAppointments.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
//         state.appointments = action.payload;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(fetchDoctorAppointments.rejected, (state, action) => {
//         state.error = action.payload || "Failed to fetch appointments";
//         state.loading = false;
//       });
//   },
// });

// export const {
//   setDoctorToken,
//   setDoctorData,
//   setAppointments,
//   setLoading,
//   setError,
//   logout,
// } = doctorSlice.actions;

// export default doctorSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const getInitialToken = () => {
  try {
    const token = localStorage.getItem("dtoken") || "";
    console.log("doctorSlice: Initial dtoken from localStorage:", token);
    return token;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return "";
  }
};

const initialState = {
  backendUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  dtoken: getInitialToken(),
  doctorData: null,
  appointments: [],
  loading: false,
  error: null,
};

export const loginDoctor = createAsyncThunk(
  "doctor/loginDoctor",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    const backendUrl =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    try {
      const response = await axios.post(`${backendUrl}/api/doctors/login`, {
        email,
        password,
      });

      const { data } = response;
      if (data?.success) {
        dispatch(setDoctorToken(data.token));
        if (data.doctor) {
          dispatch(setDoctorData(data.doctor));
        }
        return data;
      } else {
        toast.error(data?.message || "Invalid credentials");
        return rejectWithValue(data?.message || "Invalid credentials");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

export const fetchDoctorAppointments = createAsyncThunk(
  "doctor/fetchDoctorAppointments",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { backendUrl, dtoken } = getState().doctor;
    console.log("fetchDoctorAppointments: dtoken:", dtoken);

    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${backendUrl}/api/doctors/all-appointments`,
        {
          headers: { Authorization: `Bearer ${dtoken}` },
        }
      );

      const { data } = response;
      console.log("fetchDoctorAppointments: API response:", data);

      const appointments = Array.isArray(data) ? data : data.data || [];
      if (Array.isArray(appointments) || data.success) {
        dispatch(setAppointments(appointments));
        if (data.doctor) {
          dispatch(setDoctorData(data.doctor));
        }
        return appointments;
      } else {
        dispatch(setError(data.message || "Failed to fetch appointments"));
        toast.error(data.message || "Failed to fetch appointments");
        return rejectWithValue(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error in fetchDoctorAppointments:", errorMessage);
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorToken: (state, action) => {
      state.dtoken = action.payload;
      try {
        if (action.payload) {
          localStorage.setItem("dtoken", action.payload);
          toast.success("Doctor token set successfully");
        } else {
          localStorage.removeItem("dtoken");
          toast.success("Doctor token removed successfully");
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        state.error = "Failed to access localStorage";
        toast.error("Failed to access localStorage");
      }
    },
    setDoctorData: (state, action) => {
      state.doctorData = action.payload;
      state.error = null;
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.dtoken = "";
      state.doctorData = null;
      state.appointments = [];
      state.error = null;
      try {
        localStorage.removeItem("dtoken");
        console.log("doctorSlice: Removed dtoken from localStorage");
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        state.error = "Failed to clear localStorage";
        toast.error("Failed to clear localStorage");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginDoctor.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(loginDoctor.rejected, (state, action) => {
        state.error = action.payload || "Failed to login";
        state.loading = false;
      })
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch appointments";
        state.loading = false;
      });
  },
});

export const {
  setDoctorToken,
  setDoctorData,
  setAppointments,
  setLoading,
  setError,
  logout,
} = doctorSlice.actions;

export default doctorSlice.reducer;
