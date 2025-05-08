import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  doctors: [],
  userData: null,
  token: localStorage.getItem("token") || null,
  currencySymbol: "$",
  backendUrl: "http://localhost:3000",
  status: "idle",
  error: null,
};

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "doctor/fetchUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, backendUrl } = getState().doctor;
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        return response.data.user;
      } else {
        toast.error(response.data.message || "Failed to fetch user profile");
        return rejectWithValue(
          response.data.message || "Failed to fetch user profile"
        );
      }
    } catch (error) {
      const errorMessage = error.response
        ? `Profile fetch failed: ${error.response.status} - ${
            error.response.data.message || "Server error"
          }`
        : `Profile fetch failed: ${error.message}`;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to update user profile
export const updateUserProfile = createAsyncThunk(
  "doctor/updateUserProfile",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { token, backendUrl } = getState().doctor;
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully");
        return response.data.user;
      } else {
        toast.error(response.data.message || "Failed to update profile");
        return rejectWithValue(
          response.data.message || "Failed to update profile"
        );
      }
    } catch (error) {
      const errorMessage = error.response
        ? `Profile update failed: ${error.response.status} - ${
            error.response.data.message || "Server error"
          }`
        : `Profile update failed: ${error.message}`;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to fetch doctors' data (no token required)
export const fetchDoctors = createAsyncThunk(
  "doctor/fetchDoctors",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { backendUrl } = getState().doctor;
      console.log(
        "doctorSlice.js - Fetching doctors from:",
        `${backendUrl}/api/doctors/list`
      );
      const response = await axios.get(`${backendUrl}/api/doctors/list`);

      if (response.data.success) {
        if (!response.data.data || !Array.isArray(response.data.data)) {
          console.warn("doctorSlice.js - Invalid data format:", response.data);
          toast.error("No doctors data returned from server");
          return rejectWithValue("No doctors data returned from server");
        }
        console.log("doctorSlice.js - Fetched doctors:", response.data.data);
        return response.data.data;
      } else {
        console.error("doctorSlice.js - API error:", response.data.message);
        toast.error(response.data.message || "Failed to fetch doctors");
        return rejectWithValue(
          response.data.message || "Failed to fetch doctors"
        );
      }
    } catch (error) {
      const errorMessage = error.response
        ? `Doctors fetch failed: ${error.response.status} - ${
            error.response.data.message || "Server error"
          }`
        : `Doctors fetch failed: ${error.message}`;
      console.error("doctorSlice.js - Fetch error:", error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to book appointment
export const bookAppointment = createAsyncThunk(
  "doctor/bookAppointment",
  async (appointmentData, { getState, rejectWithValue }) => {
    try {
      const { token, backendUrl } = getState().doctor;
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return response.data;
      } else {
        toast.error(response.data.message || "Failed to book appointment");
        return rejectWithValue(
          response.data.message || "Failed to book appointment"
        );
      }
    } catch (error) {
      const errorMessage = error.response
        ? `Booking failed: ${error.response.status} - ${
            error.response.data.message || "Server error"
          }`
        : `Booking failed: ${error.message}`;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      state.userData = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Doctors
      .addCase(fetchDoctors.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Book Appointment
      .addCase(bookAppointment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointmentData = action.payload;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setToken, clearToken } = doctorSlice.actions;
export default doctorSlice.reducer;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";

// const initialState = {
//   doctors: [],
//   userData: null,
//   token: localStorage.getItem("token") || null,
//   currencySymbol: "$",
//   backendUrl: "http://localhost:3000",
//   status: "idle",
//   error: null,
// };

// Async thunk to fetch user profile
// export const fetchUserProfile = createAsyncThunk(
//   "doctor/fetchUserProfile",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { token, backendUrl } = getState().doctor;
//       if (!token) {
//         throw new Error("No authentication token found");
//       }
//       const response = await axios.get(`${backendUrl}/api/user/get-profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         return response.data.user;
//       } else {
//         toast.error(response.data.message || "Failed to fetch user profile");
//         return rejectWithValue(
//           response.data.message || "Failed to fetch user profile"
//         );
//       }
//     } catch (error) {
//       const errorMessage = error.response
//         ? `Profile fetch failed: ${error.response.status} - ${
//             error.response.data.message || "Server error"
//           }`
//         : `Profile fetch failed: ${error.message}`;
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// // Async thunk to update user profile
// export const updateUserProfile = createAsyncThunk(
//   "doctor/updateUserProfile",
//   async (userData, { getState, rejectWithValue }) => {
//     try {
//       const { token, backendUrl } = getState().doctor;
//       if (!token) {
//         throw new Error("No authentication token found");
//       }
//       const response = await axios.post(
//         `${backendUrl}/api/user/update-profile`,
//         userData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         toast.success("Profile updated successfully");
//         return response.data.user;
//       } else {
//         toast.error(response.data.message || "Failed to update profile");
//         return rejectWithValue(
//           response.data.message || "Failed to update profile"
//         );
//       }
//     } catch (error) {
//       const errorMessage = error.response
//         ? `Profile update failed: ${error.response.status} - ${
//             error.response.data.message || "Server error"
//           }`
//         : `Profile update failed: ${error.message}`;
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// // Async thunk to fetch doctors' data
// export const fetchDoctors = createAsyncThunk(
//   "doctor/fetchDoctors",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { token, backendUrl } = getState().doctor;
//       if (!token) {
//         throw new Error("No authentication token found");
//       }
//       const response = await axios.get(`${backendUrl}/api/doctors/list`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         if (!response.data.data) {
//           toast.error("No doctors data returned from server");
//           return rejectWithValue("No doctors data returned from server");
//         }
//         return response.data.data;
//       } else {
//         toast.error(response.data.message || "Failed to fetch doctors");
//         return rejectWithValue(
//           response.data.message || "Failed to fetch doctors"
//         );
//       }
//     } catch (error) {
//       const errorMessage = error.response
//         ? `Doctors fetch failed: ${error.response.status} - ${
//             error.response.data.message || "Server error"
//           }`
//         : `Doctors fetch failed: ${error.message}`;
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// // Async thunk to book appointment
// export const bookAppointment = createAsyncThunk(
//   "doctor/bookAppointment",
//   async (appointmentData, { getState, rejectWithValue }) => {
//     try {
//       const { token, backendUrl } = getState().doctor;
//       if (!token) {
//         throw new Error("No authentication token found");
//       }
//       const response = await axios.post(
//         `${backendUrl}/api/user/book-appointment`,
//         appointmentData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         return response.data;
//       } else {
//         toast.error(response.data.message || "Failed to book appointment");
//         return rejectWithValue(
//           response.data.message || "Failed to book appointment"
//         );
//       }
//     } catch (error) {
//       const errorMessage = error.response
//         ? `Booking failed: ${error.response.status} - ${
//             error.response.data.message || "Server error"
//           }`
//         : `Booking failed: ${error.message}`;
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// const doctorSlice = createSlice({
//   name: "doctor",
//   initialState,
//   reducers: {
//     setToken: (state, action) => {
//       state.token = action.payload;
//       localStorage.setItem("token", action.payload);
//     },
//     clearToken: (state) => {
//       state.token = null;
//       state.userData = null;
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Doctors
//       .addCase(fetchDoctors.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchDoctors.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.doctors = action.payload;
//       })
//       .addCase(fetchDoctors.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Fetch User Profile
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.userData = action.payload;
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Update User Profile
//       .addCase(updateUserProfile.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.userData = action.payload;
//       })
//       .addCase(updateUserProfile.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Book Appointment
//       .addCase(bookAppointment.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(bookAppointment.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.appointmentData = action.payload;
//       })
//       .addCase(bookAppointment.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { setToken, clearToken } = doctorSlice.actions;
// export default doctorSlice.reducer;
